import { useMemo, useState, useEffect } from "react";
import "./App.css";
import Logo from "./components/ui/Logo";
import ThemeToggle from "./components/ui/ThemeToggle";
import SearchBar from "./components/ui/SearchBar";
import UserCard from "./components/ui/UserCard";
import ErrorCard from "./components/ui/ErrorCard";
import SkeletonUserCard from "./components/ui/skeletons/SkeletonUserCard";
import TopRepos from "./components/ui/TopRepos";
import ThreeMonthHeatmap from "./components/D3/ThreeMonthHeatmap";
import SkeletonRepoCard from "./components/ui/skeletons/SkeletonRepoCard";
import DonutChart from "./components/D3/Donut";
import ForceGraph from "./components/D3/ForceGraph";
import PinnedRepos from "./components/ui/PinnedRepos";
import ShareButtonWithModal from "./components/ui/ShareButtonWithModal";
import Followers from "./components/ui/Follwers";
import {
  dummyChart,
  dummyGraph,
  dummyUser,
  dummyTopRepos,
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
  const [featuredRepos, setFeaturedRepos] = useState([]);
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
      const featuredRepos = repoRes.data
        .filter((repo) => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 3);
      console.log("most starred repos: top 3", featuredRepos);
      setFeaturedRepos(featuredRepos);
    } catch (err) {
      console.error("Repo fetch failed:", err);
      setFeaturedRepos([]);
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
    getFollowers(input)
      .then((res) => setFollowers(res.data.slice(0, 6)))
      .catch((err) => {
        console.error("Followers fetch failed:", err);
        setFollowers([]);
      });
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
    <div className="flex w-full max-w-7xl bg-neutral-100 px-4 py-8 md:gap-2.5 md:px-8 md:py-10 lg:gap-2.5 lg:px-[180px] lg:py-[130px] xl:mx-auto xl:px-36 dark:bg-neutral-900">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <Logo />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <SearchBar onSearch={handleRouteSearch} error={error} />
        {!loading && pinned && (
          <PinnedRepos repos={pinned?.length > 0 ? pinned : dummyPinned} />
        )}

        <Followers followers={followers} />

        {!loading && events && (
          <ThreeMonthHeatmap
            events={events?.length > 0 ? events : dummyEvents}
          />
        )}
        {loading && <SkeletonRepoCard />}
        {!loading && featuredRepos && (
          <TopRepos
            repos={featuredRepos?.length > 0 ? featuredRepos : dummyTopRepos}
          />
        )}
        {loading && <SkeletonUserCard />}

        {!loading && error && <ErrorCard error={error} />}

        {!loading && userData && (
          <div className="flex flex-col gap-8">
            <UserCard userData={userData} />
            <DonutChart data={userChart} />
            <ForceGraph
              nodes={forceGraphData.nodes}
              links={forceGraphData.links}
            />
          </div>
        )}
        {!loading && !userData && !error && (
          <div className="flex flex-col gap-8">
            <UserCard userData={dummyUser} />
            <DonutChart data={dummyChart} />
            <ForceGraph nodes={dummyGraph.nodes} links={dummyGraph.links} />
          </div>
        )}
        <ShareButtonWithModal />
      </div>
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
