import { SearchIcon } from "../icons";
import { useState } from "react";
import toast from "react-hot-toast";

function SearchBar({ onSearch, error, setError }) {
  const [inputValue, setInputValue] = useState("");

  const isValidUsername = (username) =>
    /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username);

  const handleClick = () => {
    if (isValidUsername(inputValue)) {
      onSearch(inputValue);
    } else {
      toast.error("Invalid GitHub username format.");
      setError("Invalid GitHub username format.");
    }
  };

  return (
    <div className="flex w-full flex-col sm:w-[400px] lg:w-[440px] xl:w-[480px]">
      <div
        className={`flex flex-row items-center justify-between gap-2 rounded-2xl px-3 py-2 shadow-xl transition-all ${error ? "ring-2 ring-red-500" : ""} bg-white dark:bg-neutral-800`}
      >
        <div className="flex items-center gap-2">
          <SearchIcon
            className={`${
              error ? "text-red-500" : "text-blue-500 dark:text-blue-300"
            }`}
          />
          <input
            type="text"
            value={inputValue}
            spellCheck={false}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch(inputValue);
              }
            }}
            className={`textPreset3Mobile sm:textPreset3 w-full min-w-52 bg-transparent px-2 placeholder-neutral-500 outline-none dark:placeholder-neutral-50 ${error ? "text-red-500" : "text-neutral-500 dark:text-neutral-50"} `}
            maxLength={39}
            placeholder="Enter a GitHub username."
          />
        </div>

        <button
          onClick={handleClick}
          className="textPreset5 rounded-[10px] bg-blue-500 px-5 py-3 text-white select-none hover:cursor-pointer hover:bg-blue-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none lg:px-4 lg:py-2"
        >
          Search
        </button>
      </div>

      {/* Error message */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default SearchBar;
