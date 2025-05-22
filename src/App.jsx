import { useState, useEffect } from "react";
import "./App.css";
import Logo from "./components/Logo";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import ErrorCard from "./components/ErrorCard";

function App() {
  const [error, setError] = useState(true);
  const [theme, setTheme] = useState("system");

  const getPreferredTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  useEffect(() => {
    const resolvedTheme = theme === "system" ? getPreferredTheme() : theme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [theme]);

  return (
    <div className="flex w-full bg-neutral-100 px-4 py-8 sm:gap-2.5 sm:px-8 sm:py-10 lg:gap-2.5 lg:px-[180px] lg:py-[130px] dark:bg-neutral-900">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <Logo />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <SearchBar error={error} />
        {error ? <ErrorCard error={error} /> : <UserCard />}
      </div>
    </div>
  );
}

export default App;
