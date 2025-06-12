import SearchBar from "./SearchBar";

function Header() {
  return (
    <header className="flex min-h-[64px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-neutral-900 select-none dark:text-white">
          devfinder
        </h1>
      </div>
      <div className="w-full sm:w-auto">
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
