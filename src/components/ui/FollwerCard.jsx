function FollowerCard({ follower }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md dark:bg-neutral-800">
      <img
        src={follower.avatar_url}
        alt={`${follower.login}'s avatar`}
        className="h-16 w-16 rounded-full object-cover"
      />
      <p className="mt-3 text-base font-semibold text-neutral-800 dark:text-white">
        {follower.name || follower.login}
      </p>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        @{follower.login}
      </p>

      {follower.bio && (
        <p className="mt-2 line-clamp-2 text-center text-sm text-neutral-600 dark:text-neutral-300">
          {follower.bio}
        </p>
      )}

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
