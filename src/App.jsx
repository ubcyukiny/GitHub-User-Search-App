import { useState } from "react";
import "./App.css";
import {
  SunIcon,
  MoonIcon,
  CompanyIcon,
  LocationIcon,
  TwitterIcon,
  WebsiteIcon,
  SearchIcon,
} from "./components/icons/";

function App() {
  const [error, setError] = useState(null);

  return (
    <div className="flex w-full bg-neutral-100 px-4 py-8 dark:bg-neutral-900">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-row content-center justify-between">
          <h1 className="logo text-natural-700 font-bold select-none dark:text-white">
            devfinder
          </h1>
          <div className="flex flex-row items-center gap-3 rounded-full bg-slate-200 p-2 hover:cursor-pointer">
            {/* do a headlessui switch incorportate
            https://headlessui.com/react/switch
            https://dribbble.com/shots/7635203-Light-Dark-mode-toggle-switcher
            */}
            <SunIcon className="text-neutral-500" />
            <MoonIcon className="text-neutral-500" />
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-between gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800">
          <div className="flex flex-grow items-center gap-2">
            <SearchIcon className="text-blue-500 dark:text-blue-300" />
            <input
              type="text"
              className="textPreset3Mobile dark:placeholder-neutral-0 -w-full bg-transparent text-neutral-500 placeholder-neutral-500 opacity-70 outline-none"
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
          <div className="flex flex-col gap-6 rounded-2xl bg-white px-6 py-8 shadow-2xl dark:bg-neutral-800 dark:text-white">
            <div className="flex gap-5">
              <img
                className="size-[70px]"
                src="/assets/icon-user.png"
                alt="userPFP"
              />
              <div className="flex flex-col">
                <div className="textPreset1 text-customNeutral-700">
                  The Octocat
                </div>
                <div className="textPreset4 mb-1 text-blue-500">@octocat</div>
                <div className="textPreset6 text-neutral-500 dark:text-white">
                  Joined 25 Jan 2011
                </div>
              </div>
            </div>
            <div className="userDetail flex flex-col gap-6">
              <p className="textPreset6 text-neutral-500 opacity-75 dark:text-white">
                This Profile has no bio
              </p>
              <div className="flex flex-col gap-4 rounded-3xl bg-neutral-100 px-5 py-4 dark:bg-neutral-900">
                <div className="flex flex-col gap-1">
                  <p className="textPreset7 text-neutral-500 dark:text-white">
                    Repos
                  </p>
                  <p className="textPreset2">8</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="textPreset7 text-neutral-500 dark:text-white">
                    Followers
                  </p>
                  <p className="textPreset2">3938</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="textPreset7 text-neutral-500 dark:text-white">
                    Following
                  </p>
                  <p className="textPreset2">9</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="textPreset7 text-neutral-500 dark:text-white">
                    Stars
                  </p>
                  <p className="textPreset2">25</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 dark:text-white">
                <div className="flex gap-4">
                  <LocationIcon className="text-neutral-900 dark:text-white" />
                  <p className="textPreset6 ml-1 text-neutral-500 dark:text-white">
                    San Francisco
                  </p>
                </div>
                <div className="flex gap-4">
                  <TwitterIcon className="text-neutral-900 dark:text-white" />
                  <p className="textPreset6 text-neutral-500 dark:text-white">
                    Not Available
                  </p>
                </div>
                <div className="flex gap-4">
                  <WebsiteIcon className="text-neutral-900 dark:text-white" />
                  <a
                    href="https://github.blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="textPreset6 rounded-md text-neutral-500 hover:cursor-pointer hover:underline hover:underline-offset-1 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-white"
                  >
                    https://github.blog
                  </a>
                </div>
                <div className="flex gap-4">
                  <CompanyIcon className="text-neutral-900 dark:text-white" />
                  <p className="textPreset6 text-neutral-500 dark:text-white">
                    @github
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
