function SkeletonRepoCard() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        Top Starred Repos
      </h2>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-white p-4 shadow-md dark:bg-neutral-800"
        >
          <div className="h-5 w-1/2 animate-pulse rounded bg-neutral-300 dark:bg-neutral-700" />
          <div className="mt-1 h-4 w-5/6 animate-pulse rounded bg-neutral-300 dark:bg-neutral-700" />
          <div className="mt-3 h-3 w-1/3 animate-pulse rounded bg-neutral-300 dark:bg-neutral-700" />
        </div>
      ))}
    </div>
  );
}
export default SkeletonRepoCard;
