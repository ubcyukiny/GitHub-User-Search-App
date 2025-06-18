import { SystemIcon, MoonIcon, SunIcon } from "../icons";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isActive = (value) => theme === value;

  return (
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
  );
}

export default ThemeToggle;
