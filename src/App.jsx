import { useState, useEffect } from "react";
import "./App.css";
import Logo from "./components/Logo";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import ErrorCard from "./components/ErrorCard";
import { getUser, getRepos, getRepoLanguages } from "./api/githubAPI";

function App() {
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("system");
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const getPreferredTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  const handleSearch = async () => {
    if (!username) return;

    try {
      const res = await getUser(username);
      setUserData(res.data);
      setError(false);
    } catch (err) {
      setUserData(null);
      setError(true);
    }
    try {
      const repoRes = await getRepos(username);
    } catch (err) {
      console.error("Repo fetch failed:", err);
    }

    const topRepos = repoRes.slice(0, 10);
    const languageTotals = {};

    for (const repo of topRepos) {
      try {
        const res = await getRepoLanguages(repoRes.owner.login, repoRes.name);
        const langs = res.data;

        for (const [lang, bytes] of Object.entries(langs)) {
          languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
        }
      } catch (err) {
        console.error(`Error fetching languages for ${repoRes.name}`, err);
      }
    }
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
          <UserCard userData={userData} />
        ) : (
          <UserCard userData={dummyUser} />
        )}
      </div>
    </div>
  );
}

export default App;
