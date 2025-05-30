import { useState, useEffect } from "react";
import "./App.css";
import Logo from "./components/ui/Logo";
import ThemeToggle from "./components/ui/ThemeToggle";
import SearchBar from "./components/ui/SearchBar";
import UserCard from "./components/ui/UserCard";
import ErrorCard from "./components/ui/ErrorCard";
import {
  getUser,
  getRepos,
  getRepoLanguages,
  buildForceGraphData,
} from "./api/githubAPI";
import DonutChart from "./components/D3/Donut";
import ForceGraph from "./components/D3/ForceGraph";

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
      topRepos = repoRes.data.slice(0, 10);
    } catch (err) {
      console.error("Repo fetch failed:", err);
    }

    const languageTotals = {};

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
    }
    const chartData = Object.entries(languageTotals).map(
      ([language, bytes]) => ({
        language,
        bytes,
      }),
    );

    setUserChart(chartData);

    buildForceGraphData(username)
      .then((data) => setForceGraphData(data))
      .catch((err) => console.error("Graph data error:", err));
  };

  useEffect(() => {
    const resolvedTheme = theme === "system" ? getPreferredTheme() : theme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [theme]);

  const dummyUser = {
    name: "The Octocat",
    login: "octocat",
    created_at: "2011-01-25T00:00:00Z",
    avatar_url: "/assets/icon-user.png",
    bio: "This profile has no bio",
    public_repos: 8,
    followers: 3938,
    following: 9,
    blog: "https://github.blog",
    location: "San Francisco",
    twitter_username: null,
    company: "github",
  };

  const dummyChart = [
    {
      language: "CSS",
      bytes: 15909,
    },
    {
      language: "HTML",
      bytes: 6611,
    },
    {
      language: "JavaScript",
      bytes: 105412,
    },
    {
      language: "Prolog",
      bytes: 4905,
    },
    {
      language: "PHP",
      bytes: 32075,
    },
    {
      language: "Python",
      bytes: 2966,
    },
  ];

  const dummyGraph = {
    nodes: [
      { id: "repo:weather-app", type: "repo", name: "weather-app", url: "#" },
      { id: "repo:todo-list", type: "repo", name: "todo-list", url: "#" },
      { id: "repo:portfolio", type: "repo", name: "portfolio", url: "#" },
      { id: "lang:JavaScript", type: "lang", name: "JavaScript" },
      { id: "lang:HTML", type: "lang", name: "HTML" },
      { id: "lang:CSS", type: "lang", name: "CSS" },
      { id: "lang:React", type: "lang", name: "React" },
    ],
    links: [
      { source: "repo:weather-app", target: "lang:JavaScript" },
      { source: "repo:weather-app", target: "lang:HTML" },
      { source: "repo:weather-app", target: "lang:CSS" },
      { source: "repo:todo-list", target: "lang:JavaScript" },
      { source: "repo:todo-list", target: "lang:React" },
      { source: "repo:portfolio", target: "lang:React" },
      { source: "repo:portfolio", target: "lang:CSS" },
    ],
  };

  return (
    <div className="flex w-full max-w-7xl bg-neutral-100 px-4 py-8 md:gap-2.5 md:px-8 md:py-10 lg:gap-2.5 lg:px-[180px] lg:py-[130px] xl:mx-auto xl:px-36 dark:bg-neutral-900">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <Logo />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <SearchBar
          username={username}
          setUsername={setUsername}
          onSearch={handleSearch}
          error={error}
        />
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
