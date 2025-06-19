import { CompanyIcon, LocationIcon, TwitterIcon, WebsiteIcon } from "../icons";

function UserCard({ userData }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        User Overview
      </h2>
      <div className="w-full rounded-2xl bg-neutral-50 px-4 py-6 shadow-xl md:px-6 md:py-6 dark:bg-neutral-800">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Avatar */}
          <img
            className="size-[70px] rounded-full md:hidden"
            src={userData.avatar_url}
            alt="user avatar"
          />
          <img
            className="hidden size-[117px] rounded-full md:block"
            src={userData.avatar_url}
            alt="user avatar"
          />

          {/* Name + username + joined */}
          <div className="flex flex-col gap-1">
            <h1 className="textPreset1 text-neutral-500 dark:text-white">
              {userData.name || "No Name"}
            </h1>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="textPreset4 cursor-pointer text-blue-500 hover:underline dark:text-blue-300"
            >
              @{userData.login}
            </a>
          </div>

          {/* Joined date (hidden on lg) */}
          <p className="textPreset6 text-neutral-500 lg:hidden dark:text-white">
            Joined{" "}
            {new Date(userData.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>

          {/* Bio */}
          <p className="textPreset6 text-neutral-500 opacity-75 dark:text-white">
            {userData.bio || "This profile has no bio"}
          </p>

          {/* Stats block */}
          <div className="w-full rounded-3xl bg-neutral-100 px-4 py-3 dark:bg-neutral-900">
            <div className="flex justify-around">
              {[
                ["Repos", userData.public_repos],
                ["Followers", userData.followers],
                ["Following", userData.following],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
                  <p className="textPreset7 text-neutral-500 dark:text-white">
                    {label}
                  </p>
                  <p className="textPreset2 text-neutral-500 dark:text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex min-w-0 items-center gap-3">
              <LocationIcon className="flex-shrink-0 text-neutral-900 dark:text-white" />
              <p className="textPreset6 truncate text-neutral-500 dark:text-white">
                {userData.location || "Not Available"}
              </p>
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <TwitterIcon className="flex-shrink-0 text-neutral-900 dark:text-white" />
              {userData.twitter_username ? (
                <a
                  href={`https://twitter.com/${userData.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="textPreset6 truncate text-neutral-500 hover:underline dark:text-white"
                >
                  @{userData.twitter_username}
                </a>
              ) : (
                <p className="textPreset6 truncate text-neutral-500 dark:text-white">
                  Not Available
                </p>
              )}
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <WebsiteIcon className="flex-shrink-0 text-neutral-900 dark:text-white" />
              {userData.blog ? (
                <a
                  href={userData.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="textPreset6 truncate text-neutral-500 hover:underline dark:text-white"
                >
                  {userData.blog}
                </a>
              ) : (
                <p className="textPreset6 truncate text-neutral-500 dark:text-white">
                  Not Available
                </p>
              )}
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <CompanyIcon className="flex-shrink-0 text-neutral-900 dark:text-white" />
              <p className="textPreset6 truncate text-neutral-500 dark:text-white">
                {userData.company ? userData.company : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
