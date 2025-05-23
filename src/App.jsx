import { useState, useEffect } from "react";
import "./App.css";
import Logo from "./components/Logo";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import ErrorCard from "./components/ErrorCard";
import { fetchGitHubUser } from "./api/getUser";

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
      const res = await fetchGitHubUser(username);
      console.log("Fetched GitHub user:", res.data);
      setUserData(res.data);
      setError(false);
    } catch (err) {
      setUserData(null);
      setError(true);
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
    <div className="flex w-full bg-neutral-100 px-4 py-8 sm:gap-2.5 sm:px-8 sm:py-10 lg:gap-2.5 lg:px-[180px] lg:py-[130px] dark:bg-neutral-900">
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
