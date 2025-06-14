import { useState, useEffect } from "react";
import "./App.css";
import UserCard from "./components/ui/UserCard";
import ErrorCard from "./components/ui/ErrorCard";
import SkeletonUserCard from "./components/ui/skeletons/SkeletonUserCard";
import ThreeMonthHeatmap from "./components/D3/ThreeMonthHeatmap";
import SkeletonRepoCard from "./components/ui/skeletons/SkeletonRepoCard";
import DonutChart from "./components/D3/Donut";
import ForceGraph from "./components/D3/ForceGraph";
import PinnedRepos from "./components/ui/PinnedRepos";
import Followers from "./components/ui/Follwers";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

import {
  dummyChart,
  dummyGraph,
  dummyUser,
  dummyEvents,
  dummyPinned,
  dummyFollowers,
} from "./data/dummyData";
import {
  getUser,
  getRepos,
  getRepoLanguages,
  buildForceGraphData,
  getUserEvents,
  getPinnedRepos,
  getFollowers,
} from "./api/githubAPI";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("system");
  const [userData, setUserData] = useState(null);
  const [userChart, setUserChart] = useState(null);
  const [forceGraphData, setForceGraphData] = useState({
    nodes: [],
    links: [],
  });
  const [events, setEvents] = useState([]);
  const [pinned, setPinned] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate();

  const getPreferredTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  const handleRouteSearch = (input) => {
    if (!input || input === username) return;
    navigate(`/${input}`);
  };

  const handleSearch = async (input) => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await getUser(input);
      setUserData(res.data);
      setError(false);
    } catch (err) {
      setUserData(null);
      setError(true);
    }
    let topRepos;
    try {
      const repoRes = await getRepos(input);
      topRepos = repoRes.data.slice(0, 20);
      console.log("top 20 repos: ", topRepos);
    } catch (err) {
      console.error("Repo fetch failed:", err);
    }

    const languageTotals = {};
    let chartData = {};
    for (const repo of topRepos) {
      try {
        const res = await getRepoLanguages(repo.owner.login, repo.name);
        const langs = res.data;
        for (const [lang, bytes] of Object.entries(langs)) {
          languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
        }
      } catch (err) {
        console.error(`Error fetching languages for ${repo.name}`, err);
      }

      chartData = Object.entries(languageTotals).map(([language, bytes]) => ({
        language,
        bytes,
      }));
    }
    setUserChart(chartData);
    buildForceGraphData(input)
      .then((data) => setForceGraphData(data))
      .catch((err) => console.error("Graph data error:", err));

    getUserEvents(input)
      .then((data) => {
        console.log("events: ", data.data);
        setEvents(data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      });

    getPinnedRepos(input)
      .then((data) => setPinned(data))
      .catch(console.error);

    let baseFollowers = [];
    try {
      const res = await getFollowers(input);
      baseFollowers = res.data.slice(0, 4);
    } catch (err) {
      console.error("Followers fetch failed:", err);
      setFollowers([]);
      return;
    }

    try {
      const enriched = await Promise.all(
        baseFollowers.map((f) => getUser(f.login).then((res) => res.data)),
      );
      setFollowers(enriched);
    } catch (err) {
      console.error("Enriching follower details failed", err);
      setFollowers([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    const resolvedTheme = theme === "system" ? getPreferredTheme() : theme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [theme]);

  useEffect(() => {
    if (username) {
      handleSearch(username);
    }
  }, [username]);

  const content = (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-12 xl:px-24">
      <Header onSearch={handleRouteSearch} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6">
          <UserCard userData={userData ? userData : dummyUser} />
          <ThreeMonthHeatmap
            theme={theme}
            events={events.length > 0 ? events : dummyEvents}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Followers followers={followers ? followers : dummyFollowers} />
          <PinnedRepos repos={pinned.length > 0 ? pinned : dummyPinned} />
        </div>
        <div className="flex flex-col gap-6">
          <DonutChart data={userChart ? userChart : dummyChart} />
          <ForceGraph
            theme={theme}
            nodes={
              forceGraphData.nodes.length > 0
                ? forceGraphData.nodes
                : dummyGraph.nodes
            }
            links={
              forceGraphData.links.length > 0
                ? forceGraphData.links
                : dummyGraph.links
            }
          />
        </div>
      </div>
      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={content} />
      <Route path="/:username" element={content} />
    </Routes>
  );
}

export default App;
