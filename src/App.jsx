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
import handleApiError from "./utils/handleApiError";

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
import toast from "react-hot-toast";
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
  const [inputValue, setInputValue] = useState("");

  const { username } = useParams();
  const navigate = useNavigate();

  // set Dates for heatmap
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setMonth(today.getMonth() - 3);

  const handleRouteSearch = (input) => {
    if (error) return; // Don't navigate if there's a known error
    if (!input || input === username) return;
    setUserData(null);
    setFollowers([]);
    setPinned([]);
    setEvents([]);
    setUserDonut(null);
    setForceGraphData({ nodes: [], links: [] });
    setError(null);
    navigate(`/${input}`);
  };

  const handleSearch = async (input) => {
    const toastId = toast.loading("🔍 Searching GitHub user...");
    setUserData(null);
    setFollowers([]);
    setPinned([]);
    setEvents([]);
    setUserDonut(null);
    setForceGraphData({ nodes: [], links: [] });
    setError(null);
    setIsUserLoading(true);
    setIsPinnedLoading(true);
    setIsFollowersLoading(true);
    setIsEventsLoading(true);
    setisDonutLoading(true);
    try {
      // User Info
      const res = await getUser(input);
      setUserData(res.data);
      if (
        res.data.public_repos === 0 &&
        res.data.followers === 0 &&
        res.data.public_gists === 0
      ) {
        toast.error("This user has no public activity.", { id: toastId });
        setIsUserLoading(false);
        setIsFollowersLoading(false);
        setIsPinnedLoading(false);
        setIsEventsLoading(false);
        setisDonutLoading(false);
        return;
      }
      setError(false);
      toast.loading("User found. Loading pinned repos...", { id: toastId });
    } catch (err) {
      toast.error(err, { id: toastId });

      setUserData(null);
      setError("Username not found. Please try again.");
      handleApiError(err, "Fetching user failed", toastId);
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
      setPinned([]);
      toast.error(err, { id: toastId });

      handleApiError(err, "Fetching pinned repos failed", toastId);
    }
    setIsPinnedLoading(false);

    // Followers
    let baseFollowers = [];
    try {
      const res = await getFollowers(input);
      baseFollowers = res.data.slice(0, 4);
    } catch (err) {
      setFollowers([]);
      toast.error(err, { id: toastId });

      handleApiError(err, "Fetching followers failed", toastId);
    }

    try {
      if (baseFollowers.length > 0) {
        const enriched = await Promise.all(
          baseFollowers.map((f) => getUser(f.login).then((res) => res.data)),
        );
        setFollowers(enriched);
        toast.loading("Followers loaded. Grabbing events...", { id: toastId });
      } else {
        setFollowers([]);
        toast("No followers to display.", { id: toastId });
      }
    } catch (err) {
      setFollowers([]);
      toast.error(err, { id: toastId });

      handleApiError(err, "Enriching follower details failed", toastId);
    }
    setIsFollowersLoading(false);

    // Events
    try {
      const contributionCalendar = await getUserEvents(
        input,
        fromDate.toISOString(),
        today.toISOString(),
      );
      setEvents(contributionCalendar);
      toast.loading("Events loaded. Generating chart...", { id: toastId });
    } catch (err) {
      setEvents([]);
      toast.error(err, { id: toastId });
      handleApiError(err, "Fetching events failed", toastId);
    }
    setIsEventsLoading(false);

    // Shared repo fetch (donut and force graph)
    let topRepos = [];
    try {
      const repoRes = await getRepos(input);
      console.log("repoRes", repoRes);
      topRepos = repoRes.data.slice(0, 15);
      console.log("topRepos: ", topRepos);
    } catch (err) {
      toast.error(err, { id: toastId });
      handleApiError(err, "Fetching user repos failed", toastId);
      setUserDonut([]);
      setForceGraphData({ nodes: [], links: [] });
      setisDonutLoading(false);
      return;
    }

    // Build both donut + force graph in parallel
    try {
      const [donutData, graphData] = await Promise.all([
        // Donut: aggregate language totals
        (async () => {
          const langTotals = {};
          await Promise.all(
            topRepos.map(async (repo) => {
              try {
                const res = await getRepoLanguages(repo.owner.login, repo.name);
                for (const [lang, bytes] of Object.entries(res.data)) {
                  langTotals[lang] = (langTotals[lang] || 0) + bytes;
                }
              } catch (err) {
                handleApiError(
                  err,
                  `Language fetch failed: ${repo.name}`,
                  toastId,
                );
              }
            }),
          );
          return Object.entries(langTotals).map(([language, bytes]) => ({
            language,
            bytes,
          }));
        })(),

        buildForceGraphData(topRepos, input),
      ]);

      setUserDonut(donutData);
      setisDonutLoading(false);
      toast.loading("Chart ready. Finalizing graph...", { id: toastId });

      setForceGraphData(graphData);
      toast.success("All data loaded successfully!", { id: toastId });
    } catch (err) {
      setUserDonut([]);
      setForceGraphData({ nodes: [], links: [] });
      setisDonutLoading(false);
      toast.success("Data loaded (no graph)", { id: toastId });
      handleApiError(err, "Generating chart/graph failed", toastId);
    }
  };

  useEffect(() => {
    if (username) {
      handleSearch(username);
    } else {
      setInputValue("");
      setUserData(null);
      setFollowers([]);
      setPinned([]);
      setEvents([]);
      setUserDonut(null);
      setForceGraphData({ nodes: [], links: [] });
      setError(null);
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
    <div className="min-h-screen w-full overflow-y-auto bg-neutral-100 dark:bg-neutral-900">
      <div className="sm:px-none flex w-full justify-center px-6">
        <div className="flex max-w-screen-2xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-12 xl:px-24">
          <Header
            onSearch={handleRouteSearch}
            error={error}
            setError={setError}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />

          <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {/* UserCard */}
            {isUserLoading ? (
              <UserCardSkeleton />
            ) : (
              <UserCard userData={userData || dummyUser} />
            )}

            {/* Followers */}
            {isFollowersLoading ? (
              <FollowersSkeleton />
            ) : (
              <Followers
                followers={
                  userData
                    ? followers?.length > 0
                      ? followers
                      : null
                    : dummyFollowers
                }
              />
            )}

            {/* DonutChart (shared fallback logic) */}
            {(isDesktopView ||
              isTabletView ||
              (!isTabletView && !isDesktopView)) &&
              (isDonutLoading ? (
                <DonutChartSkeleton />
              ) : (
                <DonutChart
                  data={userData ? (userDonut ? userDonut : null) : dummyChart}
                />
              ))}

            {/* Heatmap */}
            {isEventsLoading ? (
              <HeatmapSkeleton />
            ) : (
              <ThreeMonthHeatmap
                theme={resolvedTheme}
                events={userData ? (events ? events : null) : dummyEvents}
              />
            )}

            {/* PinnedRepos */}
            {isPinnedLoading ? (
              <PinnedReposSkeleton />
            ) : (
              <PinnedRepos
                repos={
                  userData ? (pinned.length > 0 ? pinned : null) : dummyPinned
                }
              />
            )}

            {/* ForceGraph */}
            <ForceGraph
              theme={resolvedTheme}
              nodes={
                userData
                  ? forceGraphData.nodes.length > 0
                    ? forceGraphData.nodes
                    : null
                  : dummyGraph.nodes
              }
              links={
                userData
                  ? forceGraphData.links.length > 0
                    ? forceGraphData.links
                    : null
                  : dummyGraph.links
              }
            />
          </div>

          <Footer theme={theme} userData={userData} />
        </div>
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
