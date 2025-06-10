function FollowerCard({ follower }) {
  console.log(follower);

  return (
    <div className="flex min-h-[140px] flex-col items-center rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md dark:bg-neutral-800">
      <img
        src={follower.avatar_url}
        alt={`${follower.login}'s avatar`}
        className="h-12 w-12 rounded-full object-cover"
      />
      <p className="mt-2 text-center text-sm font-semibold text-neutral-500 dark:text-neutral-50">
        @{follower.login}
      </p>
      <a
        href={follower.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 text-xs text-blue-500 hover:underline"
      >
        View profile
      </a>
    </div>
  );
}

export default FollowerCard;
