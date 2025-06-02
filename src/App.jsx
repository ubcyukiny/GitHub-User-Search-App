import { useMemo, useState, useEffect } from "react";
import "./App.css";
import Logo from "./components/ui/Logo";
import ThemeToggle from "./components/ui/ThemeToggle";
import SearchBar from "./components/ui/SearchBar";
import UserCard from "./components/ui/UserCard";
import ErrorCard from "./components/ui/ErrorCard";
import SkeletonUserCard from "./components/ui/SkeletonUserCard";
import DonutChart from "./components/D3/Donut";
import ForceGraph from "./components/D3/ForceGraph";
import { dummyChart, dummyGraph, dummyUser } from "./data/dummyData";
import {
  getUser,
  getRepos,
  getRepoLanguages,
  buildForceGraphData,
} from "./api/githubAPI";

function App() {
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("system");
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [userChart, setUserChart] = useState(null);
  const [forceGraphData, setForceGraphData] = useState({
    nodes: [],
    links: [],
  });

  const getPreferredTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  const handleSearch = async (input) => {
    if (!input) return;
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
  };

  useEffect(() => {
    const resolvedTheme = theme === "system" ? getPreferredTheme() : theme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [theme]);

  return (
    <div className="flex w-full max-w-7xl bg-neutral-100 px-4 py-8 md:gap-2.5 md:px-8 md:py-10 lg:gap-2.5 lg:px-[180px] lg:py-[130px] xl:mx-auto xl:px-36 dark:bg-neutral-900">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <Logo />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <SearchBar onSearch={handleSearch} error={error} />
        <SkeletonUserCard />
        {error ? (
          <ErrorCard error={error} />
        ) : userData ? (
          <div className="flex flex-col gap-8">
            <UserCard userData={userData} />
            <DonutChart data={userChart} />
            <ForceGraph
              nodes={forceGraphData.nodes}
              links={forceGraphData.links}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <UserCard userData={dummyUser} />
            <DonutChart data={dummyChart} />
            <ForceGraph nodes={dummyGraph.nodes} links={dummyGraph.links} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
