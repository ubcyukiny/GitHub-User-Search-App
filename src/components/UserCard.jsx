import UserIcon from "/assets/icon-user.png";
import { CompanyIcon, LocationIcon, TwitterIcon, WebsiteIcon } from "./icons";

function UserCard() {
  return (
    <div className="grid grid-cols-1 gap-8 rounded-2xl bg-neutral-50 px-6 py-8 shadow-xl sm:grid-cols-[auto_1fr] sm:p-12 dark:bg-neutral-800">
      <img
        className="hidden size-[117px] sm:block"
        src={UserIcon}
        alt="default-user-icon"
      />
      <div className="flex flex-col gap-6">
        <div className="flex gap-5">
          <img
            className="size-[70px] sm:hidden"
            src={UserIcon}
            alt="default-user-icon"
          />
          <div className="flex w-full flex-col gap-1 sm:grid sm:grid-cols-2 sm:grid-rows-2">
            <h1 className="textPreset1 text-neutral-500 sm:col-start-1 dark:text-white">
              The Octocat
            </h1>
            <p className="textPreset4 text-blue-500 sm:mb-1">@octocat</p>
            <p className="textPreset6 text-neutral-500 sm:col-start-2 sm:row-start-1 sm:text-right dark:text-white">
              Joined 25 Jan 2011
            </p>
          </div>
        </div>

        <div className="userDetail dark:neutral flex flex-col gap-6">
          <p className="textPreset6 text-neutral-500 opacity-75 dark:text-white">
            This Profile has no bio
          </p>
          <div className="flex flex-col gap-4 rounded-3xl bg-neutral-100 px-5 py-4 sm:flex-row sm:justify-around sm:px-8 sm:py-4 dark:bg-neutral-900">
            <div className="flex flex-col gap-1">
              <p className="textPreset7 text-neutral-500 dark:text-white">
                Repos
              </p>
              <p className="textPreset2 text-neutral-500 dark:text-white">8</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="textPreset7 text-neutral-500 dark:text-white">
                Followers
              </p>
              <p className="textPreset2 text-neutral-500 dark:text-white">
                3938
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="textPreset7 text-neutral-500 dark:text-white">
                Following
              </p>
              <p className="textPreset2 text-neutral-500 dark:text-white">9</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="textPreset7 text-neutral-500 dark:text-white">
                Stars
              </p>
              <p className="textPreset2 text-neutral-500 dark:text-white">25</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:grid-rows-2 dark:text-white">
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
    </div>
  );
}

export default UserCard;
