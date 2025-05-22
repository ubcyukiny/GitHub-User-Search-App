import { useState, useEffect } from "react";
import "./App.css";
import {
  SunIcon,
  MoonIcon,
  CompanyIcon,
  LocationIcon,
  TwitterIcon,
  WebsiteIcon,
  SearchIcon,
  SystemIcon,
} from "./components/icons/";
import UserCard from "./components/UserCard";

function App() {
  const [error, setError] = useState(null);
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

  const isActive = (value) => theme === value;

  return (
    <div className="flex w-full bg-neutral-100 px-4 py-8 sm:gap-2.5 sm:px-8 sm:py-10 lg:gap-2.5 lg:px-[180px] lg:py-[130px] dark:bg-neutral-900">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <h1 className="logo font-bold text-neutral-950 select-none dark:text-white">
            devfinder
          </h1>
          <div className="inline-grid grid-cols-3 gap-0.5 rounded-full bg-slate-200 p-0.5 dark:bg-neutral-700">
            <button
              onClick={() => setTheme("system")}
              className={`flex aspect-square w-9 items-center justify-center rounded-full transition-colors ${
                isActive("system")
                  ? "bg-white text-black ring ring-gray-300 dark:bg-gray-600 dark:text-white dark:ring-white/20"
                  : "text-gray-500 hover:bg-gray-100 dark:text-white/50 dark:hover:bg-white/10"
              }`}
              title="Use system theme"
            >
              <SystemIcon className="size-5" />
            </button>

            <button
              onClick={() => setTheme("light")}
              className={`flex aspect-square w-9 items-center justify-center rounded-full transition-colors ${
                isActive("light")
                  ? "bg-white text-black ring ring-gray-300"
                  : "text-gray-500 hover:bg-gray-100 dark:text-white/50 dark:hover:bg-white/10"
              }`}
              title="Light mode"
            >
              <SunIcon className="size-5" />
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`flex aspect-square w-9 items-center justify-center rounded-full transition-colors ${
                isActive("dark")
                  ? "bg-gray-600 text-white ring ring-white/10"
                  : "text-gray-500 hover:bg-gray-100 dark:text-white/50 dark:hover:bg-white/10"
              }`}
              title="Dark mode"
            >
              <MoonIcon className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-between gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800">
          <div className="flex flex-grow items-center gap-2">
            <SearchIcon className="text-blue-500 dark:text-blue-300" />
            <input
              type="text"
              className="textPreset3Mobile sm:textPreset3 w-full bg-transparent text-neutral-500 placeholder-neutral-500 opacity-70 outline-none dark:text-neutral-50 dark:placeholder-neutral-50"
              maxLength={39}
              placeholder="Search GitHub username..."
            />
          </div>
          <button className="textPreset5 rounded-[10px] bg-blue-500 px-5 py-3 text-white hover:cursor-pointer hover:bg-blue-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
            Search
          </button>
        </div>
        {error ? (
          <div className="flex flex-col gap-6 rounded-2xl bg-white px-6 py-8 shadow-2xl">
            <div className="textPreset2 flex justify-center text-neutral-700">
              No results found!
            </div>
            <div className="textPreset6 text-neutral-300">
              We couldn't find any GitHub users matching your search. Please
              double-check the username and try again.
            </div>
          </div>
        ) : (
          <UserCard />
        )}
      </div>
    </div>
  );
}

export default App;
