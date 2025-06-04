import { useMemo } from "react";
import { eachDayOfInterval, format, subMonths } from "date-fns";
import clsx from "clsx";

function generateDateGrid(monthsBack = 3) {
  const start = subMonths(new Date(), monthsBack);
  const end = new Date();

  // Fill from Sunday to Saturday per week, GitHub style
  const days = eachDayOfInterval({ start, end });
  return days;
}

function countEventsByDate(events) {
  const map = new Map();

  for (const e of events) {
    const day = format(new Date(e.created_at), "yyyy-MM-dd");
    map.set(day, (map.get(day) || 0) + 1);
  }

  return map;
}

function ActivityHeatmap({ events }) {
  const days = useMemo(() => generateDateGrid(3), []);
  const counts = useMemo(() => countEventsByDate(events), [events]);

  const colorScale = (count) => {
    if (!count) return "bg-neutral-200";
    if (count < 2) return "bg-green-100";
    if (count < 4) return "bg-green-300";
    if (count < 6) return "bg-green-500";
    return "bg-green-700";
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        Activity Heatmap
      </h2>
      <div className="grid auto-cols-max grid-flow-col grid-rows-7 gap-[4px]">
        {days.map((date, idx) => {
          const key = format(date, "yyyy-MM-dd");
          const count = counts.get(key) || 0;

          return (
            <div
              key={idx}
              title={`${key}: ${count} events`}
              className={clsx("h-3 w-3 rounded-sm", colorScale(count))}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ActivityHeatmap;
