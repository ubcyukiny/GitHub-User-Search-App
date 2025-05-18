import { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [error, setError] = useState(true);

  return (
    <div className="flex w-full bg-neutral-100 px-4 py-8">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-row content-center justify-between">
          <h1 className="logo text-natural-700 font-bold">devfinder</h1>
          <div className="flex flex-row items-center gap-3 hover:cursor-pointer">
            <p className="textPreset8 text-neutral-500">DARK</p>
            <img className="size-5" src="/assets/icon-moon.svg" alt="moon" />
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl focus:outline-blue-500">
          <div className="flex items-center gap-2">
            <img
              className="size-5"
              src="/assets/icon-search.svg"
              alt="lookup"
            />
            <p className="textPreset3Mobile text-neutral-500">
              Search GitHub username...
            </p>
          </div>
          <button className="textPreset5 rounded-[10px] bg-blue-500 px-5 py-3 text-white hover:cursor-pointer hover:bg-blue-300">
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
          <div className="flex flex-col gap-6 rounded-2xl bg-white px-6 py-8 shadow-2xl">
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
                <div className="textPreset6 text-neutral-500">
                  Joined 25 Jan 2011
                </div>
              </div>
            </div>
            <div className="userDetail flex flex-col gap-6">
              <p className="textPreset6 text-neutral-500 opacity-75">
                This Profile has no bio
              </p>
              <div className="flex flex-col gap-4 rounded-3xl bg-neutral-100 px-5 py-4">
                <div className="flex flex-col gap-1">
                  <p className="textPreset7 text-neutral-500">Repos</p>
                  <p className="textPreset2">8</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="textPreset7 text-neutral-500">Followers</p>
                  <p className="textPreset2">3938</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="textPreset7 text-neutral-500">Following</p>
                  <p className="textPreset2">9</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="textPreset7 text-neutral-500">Stars</p>
                  <p className="textPreset2">25</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <img
                    className="h-5 w-3.5 fill-neutral-900"
                    src="/assets/icon-location.svg"
                    alt="icon-location"
                  />
                  <p className="textPreset6 text-neutral-500">San Francisco</p>
                </div>
                <div className="flex gap-4">
                  <img
                    className="h-4 w-5 fill-neutral-900"
                    src="/assets/icon-twitter.svg"
                    alt="icon-twitter"
                  />
                  <p className="textPreset6 text-neutral-500">Not Available</p>
                </div>
                <div className="flex gap-4">
                  <img
                    className="size-5 fill-neutral-900"
                    src="/assets/icon-website.svg"
                    alt="icon-website"
                  />
                  <p className="textPreset6 text-neutral-500">
                    https://github.blog
                  </p>
                </div>
                <div className="flex gap-4">
                  <img
                    className="size-5 fill-neutral-900"
                    src="/assets/icon-company.svg"
                    alt="icon-company"
                  />
                  <p className="textPreset6 text-neutral-500">@github</p>
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
