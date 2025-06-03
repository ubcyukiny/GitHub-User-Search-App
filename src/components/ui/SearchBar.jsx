import { SearchIcon } from "../icons";
import { useState } from "react";

function SearchBar({ onSearch, error }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex w-full flex-row items-center justify-between gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl focus:ring-2 focus:ring-blue-500 sm:gap-6 dark:bg-neutral-800">
      <div className="flex flex-grow items-center gap-2">
        <SearchIcon className="text-blue-500 dark:text-blue-300" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(inputValue);
            }
          }}
          className="textPreset3Mobile sm:textPreset3 w-full bg-transparent text-neutral-500 placeholder-neutral-500 opacity-70 outline-none dark:text-neutral-50 dark:placeholder-neutral-50"
          maxLength={39}
          placeholder="Search GitHub username..."
        />
      </div>
      {error && (
        <span className="textPreset7 hidden font-bold text-red-500 select-none sm:block">
          No results
        </span>
      )}
      <button
        onClick={(e) => {
          onSearch(inputValue);
        }}
        className="textPreset5 rounded-[10px] bg-blue-500 px-5 py-3 text-white select-none hover:cursor-pointer hover:bg-blue-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
