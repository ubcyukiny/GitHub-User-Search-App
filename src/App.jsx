import { useState, useEffect } from "react";
import "./App.css";
import UserCard from "./components/ui/UserCard";
import ErrorCard from "./components/ui/ErrorCard";
import UserCardSkeleton from "./components/ui/skeletons/UserCardSkeleton";
import FollowersSkeleton from "./components/ui/skeletons/FollowersSkeleton";
import ThreeMonthHeatmap from "./components/D3/ThreeMonthHeatmap";
import HeatmapSkeleton from "./components/ui/skeletons/HeatmapSkeleton";
import PinnedReposSkeleton from "./components/ui/skeletons/PinnedRepoSkeleton";
import DonutChartSkeleton from "./components/ui/skeletons/DonutChartSkeleton";
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
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isPinnedLoading, setIsPinnedLoading] = useState(false);
  const [isFollowersLoading, setIsFollowersLoading] = useState(false);
  const [isEventsLoading, setIsEventsLoading] = useState(false);
  const [isDonutLoading, setisDonutLoading] = useState(false);

  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("system");
  const [userData, setUserData] = useState(null);
  const [userDonut, setUserDonut] = useState(null);
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

    setIsUserLoading(true);
    setIsPinnedLoading(true);
    setIsFollowersLoading(true);
    setIsEventsLoading(true);
    setisDonutLoading(true);
    // user
    try {
      const res = await getUser(input);
      setUserData(res.data);
      setError(false);
    } catch (err) {
      setUserData(null);
      setError(true);
    }
    setIsUserLoading(false);

    // pinned repo
    getPinnedRepos(input)
      .then((data) => setPinned(data))
      .catch(console.error)
      .finally(() => setIsPinnedLoading(false));

    // followers
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
    setIsFollowersLoading(false);

    // Events
    getUserEvents(input)
      .then((data) => {
        setEvents(data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      });
    setIsEventsLoading(false);

    // repo chart
    let topRepos;
    try {
      const repoRes = await getRepos(input);
      topRepos = repoRes.data.slice(0, 20);
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
    setUserDonut(chartData);
    setisDonutLoading(false);

    // graph
    buildForceGraphData(input)
      .then((data) => setForceGraphData(data))
      .catch((err) => console.error("Graph data error:", err));
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

  function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      const listener = () => setMatches(media.matches);
      setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
  }

  const isTabletView = useMediaQuery(
    "(min-width: 640px) and (max-width: 1279px)",
  );
  const isDesktopView = useMediaQuery("(min-width: 1280px)");

  const content = (
    <div className="flex w-full justify-center">
      <div className="flex max-w-screen-2xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-12 xl:px-24">
        <Header onSearch={handleRouteSearch} />
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:justify-items-stretch xl:grid-cols-3">
          {/* Column 1 */}
          <div className="flex w-full max-w-xl flex-col gap-6">
            {isUserLoading ? (
              <UserCardSkeleton />
            ) : (
              <UserCard userData={userData || dummyUser} />
            )}
            {isEventsLoading ? (
              <HeatmapSkeleton />
            ) : (
              <ThreeMonthHeatmap
                theme={theme}
                events={events.length > 0 ? events : dummyEvents}
              />
            )}
            {isTabletView &&
              (isDonutLoading ? (
                <DonutChartSkeleton />
              ) : (
                <DonutChart data={userDonut || dummyChart} />
              ))}
          </div>

          {/* Column 2 */}
          <div className="flex w-full max-w-xl flex-col gap-6">
            {isFollowersLoading ? (
              <FollowersSkeleton />
            ) : (
              <Followers followers={followers || dummyFollowers} />
            )}
            {isPinnedLoading ? (
              <PinnedReposSkeleton />
            ) : (
              <PinnedRepos repos={pinned.length > 0 ? pinned : dummyPinned} />
            )}
            {!isTabletView &&
              !isDesktopView &&
              (isDonutLoading ? (
                <DonutChartSkeleton />
              ) : (
                <DonutChart data={userDonut || dummyChart} />
              ))}
            {!isTabletView && !isDesktopView && (
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
            )}
            {/* Mobile */}
            {isTabletView && (
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
            )}
          </div>

          {/* Column 3 (desktop only) */}
          {isDesktopView && (
            <div className="flex w-full max-w-xl flex-col gap-6">
              {isDonutLoading ? (
                <DonutChartSkeleton />
              ) : (
                <DonutChart data={userDonut || dummyChart} />
              )}
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
          )}
        </div>

        <Footer theme={theme} setTheme={setTheme} />
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
