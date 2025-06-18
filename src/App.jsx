import { useState, useEffect } from "react";
import "./App.css";
import UserCard from "./components/ui/UserCard";
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
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "./context/ThemeContext";

function App() {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isPinnedLoading, setIsPinnedLoading] = useState(false);
  const [isFollowersLoading, setIsFollowersLoading] = useState(false);
  const [isEventsLoading, setIsEventsLoading] = useState(false);
  const [isDonutLoading, setisDonutLoading] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [error, setError] = useState(null);
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
    if (!input) {
      toast.error("❗ Please enter a username.");
      return;
    }
    if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(input)) {
      setError("Invalid GitHub username format.");
      toast.error("Invalid GitHub username format.");
      return;
    }

    const toastId = toast.loading("🔍 Searching GitHub user...");

    setIsUserLoading(true);
    setIsPinnedLoading(true);
    setIsFollowersLoading(true);
    setIsEventsLoading(true);
    setisDonutLoading(true);

    try {
      // User Info
      const res = await getUser(input);
      setUserData(res.data);
      toast.loading("User found. Loading pinned repos...", { id: toastId });
      setError(false);
    } catch (err) {
      setError("Username not found. Please try again.");
      toast.error("User not found. Try another username.", {
        id: toastId,
        duration: 4000,
      });
      setIsUserLoading(false);
      setIsFollowersLoading(false);
      setIsPinnedLoading(false);
      setIsEventsLoading(false);
      setisDonutLoading(false);
      return;
    }
    setIsUserLoading(false);

    // Pinned Repos
    try {
      const pinnedData = await getPinnedRepos(input);
      setPinned(pinnedData.slice(0, 4));
      toast.loading("Pinned repos loaded. Fetching followers...", {
        id: toastId,
      });
    } catch (err) {
      console.error("Pinned repo fetch failed:", err);
      setPinned([]);
      toast("No pinned repos found.", { id: toastId });
    }
    setIsPinnedLoading(false);

    // Followers
    let baseFollowers = [];
    try {
      const res = await getFollowers(input);
      baseFollowers = res.data.slice(0, 4);
    } catch (err) {
      console.error("Followers fetch failed:", err);
      setFollowers([]);
      toast("Could not load followers.", { id: toastId });
    }

    try {
      if (baseFollowers.length > 0) {
        const enriched = await Promise.all(
          baseFollowers.map((f) => getUser(f.login).then((res) => res.data)),
        );
        setFollowers(enriched);
        toast.loading("Followers loaded. Grabbing events...", {
          id: toastId,
        });
      } else {
        setFollowers([]);
        toast("No followers to display.", { id: toastId });
      }
    } catch (err) {
      console.error("Enriching follower details failed:", err);
      setFollowers([]);
      toast("Could not load follower details.", { id: toastId });
    }
    setIsFollowersLoading(false);

    // Events
    try {
      const eventsRes = await getUserEvents(input);
      setEvents(eventsRes.data);
      toast.loading("Events loaded. Generating chart...", { id: toastId });
    } catch (err) {
      console.error("Event fetch failed:", err);
      setEvents([]);
      toast("No recent events found.", { id: toastId });
    }
    setIsEventsLoading(false);

    // Donut Chart
    let topRepos = [];
    try {
      const repoRes = await getRepos(input);
      topRepos = repoRes.data.slice(0, 20);
    } catch (err) {
      console.error("Repo fetch failed:", err);
      toast("Failed to fetch repos.", { id: toastId });
    }

    const languageTotals = {};
    let chartData = [];
    for (const repo of topRepos) {
      try {
        const res = await getRepoLanguages(repo.owner.login, repo.name);
        for (const [lang, bytes] of Object.entries(res.data)) {
          languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
        }
      } catch (err) {
        console.error(`Error fetching languages for ${repo.name}`, err);
      }
    }
    chartData = Object.entries(languageTotals).map(([language, bytes]) => ({
      language,
      bytes,
    }));
    setUserDonut(chartData);
    toast.loading("Chart ready. Finalizing graph...", { id: toastId });
    setisDonutLoading(false);

    // Force Graph
    try {
      const graphData = await buildForceGraphData(input);
      setForceGraphData(graphData);
      toast.success("All data loaded successfully!", { id: toastId });
    } catch (err) {
      console.error("Force graph fetch failed:", err);
      setForceGraphData({ nodes: [], links: [] });
      toast.success("Data loaded (no graph)", { id: toastId });
    }
  };

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
      <div className="flex max-w-screen-2xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-12 xl:px-24">
        <Header
          onSearch={handleRouteSearch}
          error={error}
          setError={setError}
        />
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
                theme={resolvedTheme}
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
                theme={resolvedTheme}
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
                theme={resolvedTheme}
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
                theme={resolvedTheme}
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
        <Footer theme={theme} userData={userData} />
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
