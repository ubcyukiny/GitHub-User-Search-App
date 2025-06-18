import SearchBar from "./SearchBar";
import Logo from "./Logo";
function Header({ onSearch, error, setError, inputValue, setInputValue }) {
  return (
    <header className="flex min-h-[64px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Logo />
      <div className="w-full sm:w-auto">
        <SearchBar
          onSearch={onSearch}
          error={error}
          setError={setError}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
    </header>
  );
}

export default Header;
