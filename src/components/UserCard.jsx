import { CompanyIcon, LocationIcon, TwitterIcon, WebsiteIcon } from "./icons";

function UserCard({ userData }) {
  return (
    <div className="grid grid-cols-1 gap-8 rounded-2xl bg-neutral-50 px-6 py-8 shadow-xl md:grid-cols-[auto_1fr] md:p-12 dark:bg-neutral-800">
      <img
        className="hidden size-[117px] rounded-full select-none md:block"
        src={userData.avatar_url}
        alt="default-user-icon"
      />
      <div className="flex flex-col gap-6">
        <div className="flex gap-5">
          <img
            className="size-[70px] rounded-full select-none md:hidden"
            src={userData.avatar_url}
            alt="default-user-icon"
          />
          <div className="flex w-full flex-col gap-1 md:grid md:grid-cols-2 md:grid-rows-2">
            <h1 className="textPreset1 text-neutral-500 md:col-start-1 dark:text-white">
              {userData.name}
            </h1>

            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="textPreset4 rounded-md text-blue-500 hover:cursor-pointer hover:underline hover:underline-offset-1 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none md:mb-1"
            >
              @{userData.login}
            </a>

            <p className="textPreset6 text-neutral-500 md:col-start-2 md:row-start-1 md:text-right dark:text-white">
              Joined at{" "}
              {new Date(userData.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="userDetail dark:neutral flex flex-col gap-6">
          <p className="textPreset6 text-neutral-500 opacity-75 dark:text-white">
            {userData.bio}
          </p>
          <div className="flex flex-col gap-4 rounded-3xl bg-neutral-100 px-5 py-4 md:flex-row md:justify-around md:px-8 md:py-4 dark:bg-neutral-900">
            <div className="flex flex-col gap-1">
              <p className="textPreset7 text-neutral-500 select-none dark:text-white">
                Repos
              </p>
              <p className="textPreset2 text-neutral-500 dark:text-white">
                {userData.public_repos}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="textPreset7 text-neutral-500 select-none dark:text-white">
                Followers
              </p>
              <p className="textPreset2 text-neutral-500 dark:text-white">
                {userData.followers}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="textPreset7 text-neutral-500 select-none dark:text-white">
                Following
              </p>
              <p className="textPreset2 text-neutral-500 dark:text-white">
                {userData.following}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:grid-rows-2 dark:text-white">
            <div className="flex gap-4">
              <LocationIcon className="text-neutral-900 dark:text-white" />
              <p className="textPreset6 ml-1 text-neutral-500 caret-transparent focus:outline-none dark:text-white">
                {userData.location || "Not Available"}
              </p>
            </div>
            <div className="flex gap-4">
              <TwitterIcon className="text-neutral-900 dark:text-white" />
              <p className="textPreset6 text-neutral-500 caret-transparent focus:outline-none dark:text-white">
                {userData.twitter_username || "Not Available"}
              </p>
            </div>
            <div className="flex min-w-0 gap-4">
              <WebsiteIcon className="text-neutral-900 dark:text-white" />
              <a
                href={userData.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="textPreset6 w-full truncate rounded-md text-neutral-500 caret-transparent hover:cursor-pointer hover:underline hover:underline-offset-1 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-white"
              >
                {userData.blog || "Not Available"}
              </a>
            </div>
            <div className="flex gap-4">
              <CompanyIcon className="text-neutral-900 dark:text-white" />
              <p className="textPreset6 text-neutral-500 caret-transparent focus:outline-none dark:text-white">
                {userData.company ? `@${userData.company}` : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
