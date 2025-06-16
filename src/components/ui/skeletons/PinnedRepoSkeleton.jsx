function PinnedReposSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        Pinned Repositories
      </h2>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl bg-white p-4 shadow-md dark:bg-neutral-800"
        >
          {/* Repo name */}
          <div className="h-5 w-1/2 rounded bg-neutral-300 dark:bg-neutral-700" />

          {/* Description lines */}
          <div className="mt-2 h-4 w-full rounded bg-neutral-300 dark:bg-neutral-700" />
          <div className="mt-1 h-4 w-2/3 rounded bg-neutral-300 dark:bg-neutral-700" />

          {/* Stars + Language */}
          <div className="mt-3 flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="h-3 w-16 rounded bg-neutral-300 dark:bg-neutral-700" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="h-3 w-20 rounded bg-neutral-300 dark:bg-neutral-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PinnedReposSkeleton;
