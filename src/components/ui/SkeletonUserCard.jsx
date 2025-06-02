function SkeletonUserCard() {
  return (
    <div className="grid grid-cols-1 gap-8 rounded-2xl bg-neutral-50 px-6 py-8 shadow-xl md:grid-cols-[auto_1fr] md:p-12 dark:bg-neutral-800">
      <div className="hidden size-[117px] animate-pulse rounded-full bg-neutral-300 md:block dark:bg-neutral-700" />
      <div className="flex flex-col gap-6">
        <div className="flex gap-5">
          <div
            className="size-[70px] animate-pulse rounded-full bg-neutral-300 md:hidden dark:bg-neutral-700"
            style={{ aspectRatio: 1 }}
          />
          <div className="flex w-full animate-pulse flex-col gap-1 md:grid md:grid-cols-2 md:grid-rows-2">
            <div className="h-6 w-2/3 rounded bg-neutral-300 md:col-start-1 dark:bg-neutral-700" />
            <div className="h-4 w-1/3 rounded bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-4 w-1/2 rounded bg-neutral-300 md:col-start-2 md:row-start-1 md:justify-self-end dark:bg-neutral-700" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-300 dark:bg-neutral-700" />
          <div className="flex flex-col gap-4 rounded-3xl bg-neutral-100 px-5 py-4 md:flex-row md:justify-around md:px-8 md:py-4 dark:bg-neutral-900">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex animate-pulse flex-col gap-1">
                <div className="h-3 w-12 rounded bg-neutral-300 dark:bg-neutral-700" />
                <div className="h-5 w-16 rounded bg-neutral-300 dark:bg-neutral-700" />
              </div>
            ))}
          </div>

          <div className="flex animate-pulse flex-col gap-4 md:grid md:grid-cols-2 md:grid-rows-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
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

export default SkeletonUserCard;
