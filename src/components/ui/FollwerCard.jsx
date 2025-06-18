function FollowerCard({ follower }) {
  return (
    <div className="hover:bg-neutral-20 flex flex-col items-center rounded-lg bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.015] hover:shadow-md dark:bg-neutral-800 dark:hover:bg-neutral-700">
      <div className="flex flex-grow flex-col items-center">
        <img
          src={follower.avatar_url}
          alt={`${follower.login}'s avatar`}
          className="h-16 w-16 rounded-full object-cover"
        />
        <p className="mt-3 text-base font-semibold text-neutral-800 dark:text-white">
          {follower.name || follower.login}
        </p>
        <a
          href={follower.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-sm text-blue-500 hover:underline dark:text-blue-300"
        >
          @{follower.login}
        </a>

        {follower.bio && (
          <p className="mt-2 line-clamp-2 text-center text-sm text-neutral-600 dark:text-neutral-300">
            {follower.bio}
          </p>
        )}
      </div>

      <div className="mt-4 flex w-full justify-center gap-8 text-center text-sm">
        <div>
          <p className="font-medium text-neutral-800 dark:text-white">
            {follower.followers}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Followers
          </p>
        </div>
        <div>
          <p className="font-medium text-neutral-800 dark:text-white">
            {follower.following}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Following
          </p>
        </div>
      </div>
    </div>
  );
}

export default FollowerCard;
