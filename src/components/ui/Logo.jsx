import icon3 from "/assets/icon3.png";
import icon3dark from "/assets/icon3dark.png";
import { useLocation, Link } from "react-router-dom";

function Logo() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <Link
      to="/"
      className={`logo flex items-center gap-3 ${isHome ? "cursor-default" : "cursor-pointer"}`}
    >
      <img
        src={icon3}
        alt="devfinder logo"
        className="block size-10 dark:hidden"
      />
      <img
        src={icon3dark}
        alt="devfinder logo"
        className="hidden size-10 dark:block"
      />
      <h1 className="text-2xl font-bold text-neutral-950 dark:text-white">
        devfinder
      </h1>
    </Link>
  );
}

export default Logo;
