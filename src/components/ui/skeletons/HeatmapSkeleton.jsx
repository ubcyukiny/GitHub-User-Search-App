function HeatmapSkeleton() {
  const weeks = 13; // ~3 months
  const days = 7;
  const yLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        GitHub Contribution Activity
      </h2>

      <div className="flex w-full justify-center overflow-x-auto rounded-2xl bg-neutral-50 px-4 py-6 shadow-xl dark:bg-neutral-800">
        <div className="flex flex-col gap-2">
          {/* Month labels (placeholder) */}
          <div
            className="mt-2 mb-1 grid animate-pulse grid-cols-13 gap-[3px] pl-[36px]"
            style={{ width: `${13 * 16 + 12 * 3}px` }} // 13 columns * cell + 12 gaps
          >
            <div className="col-span-2 col-start-3 h-4 w-10 rounded bg-neutral-300 dark:bg-neutral-700" />
            <div className="col-span-2 col-start-7 h-4 w-10 rounded bg-neutral-300 dark:bg-neutral-700" />
            <div className="col-span-2 col-start-11 h-4 w-10 rounded bg-neutral-300 dark:bg-neutral-700" />
          </div>

          <div className="flex">
            {/* Y-axis day labels */}
            <div className="mt-2 mr-[8px] flex flex-col justify-between pt-[2px]">
              {yLabels.map((label, i) =>
                label ? (
                  <div
                    key={i}
                    className="h-[13.5px] w-8 text-right text-sm text-neutral-400 dark:text-neutral-500"
                  >
                    {label}
                  </div>
                ) : (
                  <div key={i} className="h-[13.5px] w-8" />
                ),
              )}
            </div>

            {/* Heatmap grid */}
            <div
              className="grid animate-pulse"
              style={{
                gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
                gap: "3px",
              }}
            >
              {[...Array(weeks * days)].map((_, i) => (
                <div
                  key={i}
                  className="h-[13.5px] w-[13.5px] rounded-[2px] bg-neutral-300 dark:bg-neutral-700"
                />
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mb-2 flex items-center gap-2 pl-[40px] text-sm">
            <span className="text-neutral-400 dark:text-neutral-500">Less</span>
            <div className="flex animate-pulse gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 rounded-[2px] bg-neutral-300 dark:bg-neutral-700"
                />
              ))}
            </div>
            <span className="text-neutral-400 dark:text-neutral-500">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeatmapSkeleton;
