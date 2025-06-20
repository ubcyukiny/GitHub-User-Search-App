function SkeletonUserCard() {
  return (
    <div className="flex h-full flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        User Overview
      </h2>
      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-neutral-50 px-4 py-6 shadow-xl md:px-6 md:py-6 dark:bg-neutral-800">
        <div className="flex grow flex-col items-center justify-center gap-6 text-center">
          {/* Avatar */}
          <div className="size-[70px] animate-pulse rounded-full bg-neutral-300 md:hidden dark:bg-neutral-700" />
          <div className="hidden size-[117px] animate-pulse rounded-full bg-neutral-300 md:block dark:bg-neutral-700" />

          {/* Name + username */}
          <div className="flex animate-pulse flex-col items-center gap-2">
            <div className="h-6 w-36 rounded bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-5 w-24 rounded bg-blue-500 dark:bg-blue-300" />
          </div>

          {/* Joined date */}
          <div className="h-4 w-28 animate-pulse rounded bg-neutral-300 lg:hidden dark:bg-neutral-700" />

          {/* Bio */}
          <div className="flex w-full animate-pulse flex-col gap-2 px-6">
            <div className="h-4 w-full rounded bg-neutral-300 opacity-75 dark:bg-neutral-700" />
            <div className="h-4 w-5/6 rounded bg-neutral-300 opacity-75 dark:bg-neutral-700" />
            <div className="h-4 w-2/3 rounded bg-neutral-300 opacity-75 dark:bg-neutral-700" />
          </div>

          {/* Stats */}
          <div className="w-full rounded-3xl bg-neutral-100 px-4 py-3 dark:bg-neutral-900">
            <div className="flex justify-around">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex animate-pulse flex-col items-center gap-2"
                >
                  <div className="h-3 w-14 rounded bg-neutral-300 dark:bg-neutral-700" />
                  <div className="h-5 w-10 rounded bg-neutral-300 dark:bg-neutral-700" />
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex min-w-0 animate-pulse items-center gap-3"
              >
                <div className="size-5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="h-4 w-2/3 rounded bg-neutral-300 dark:bg-neutral-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
