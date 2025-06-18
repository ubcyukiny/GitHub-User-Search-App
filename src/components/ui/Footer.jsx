import ShareButtonWithModal from "./ShareButtonWithModal";
import ThemeToggle from "./ThemeToggle";

function Footer({ theme, setTheme, userData }) {
  return (
    <footer className="w-full border-t border-neutral-700 px-4 py-10 text-sm text-neutral-500 dark:text-neutral-400">
      <div className="flex flex-col items-center gap-6">
        {/* Row: Toggle / Attribution / Share */}
        <div className="flex w-full max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <p className="text-center text-xs sm:text-sm">
            Built by{" "}
            <a
              href="https://github.com/ubcyukiny"
              className="text-blue-500 hover:underline dark:text-blue-300"
              target="_blank"
              rel="noreferrer"
            >
              Ken Yu
            </a>{" "}
            · React · Tailwind CSS · D3.js · GitHub API
          </p>
          <ShareButtonWithModal userData={userData} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
