import SearchBar from "./SearchBar";
import Logo from "./Logo";
function Header({ onSearch }) {
  return (
    <header className="flex min-h-[64px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Logo />
      <div className="w-full sm:w-auto">
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
}

export default Header;
