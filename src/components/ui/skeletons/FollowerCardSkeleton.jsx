function FollowerCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col items-center rounded-lg bg-white p-4 shadow-sm dark:bg-neutral-800">
      <div className="flex grow flex-col items-center">
        {/* Avatar */}
        <div className="h-16 w-16 rounded-full bg-neutral-300 dark:bg-neutral-700" />

        {/* Name */}
        <div className="mt-3 h-5 w-24 rounded bg-neutral-300 dark:bg-neutral-700" />

        {/* Username */}
        <div className="mt-2 h-4 w-20 rounded bg-blue-500 dark:bg-blue-300" />

        {/* Bio (2 lines) */}
        <div className="mt-3 h-4 w-32 rounded bg-neutral-300 dark:bg-neutral-700" />
        <div className="mt-1 h-4 w-28 rounded bg-neutral-300 dark:bg-neutral-700" />
      </div>

      {/* Followers / Following */}
      <div className="mt-4 flex w-full justify-center gap-8 text-center text-sm">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="h-4 w-6 rounded bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-3 w-12 rounded bg-neutral-300 dark:bg-neutral-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowerCardSkeleton;
