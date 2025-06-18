import { useEffect, useRef } from "react";
import * as d3 from "d3";

function ThreeMonthHeatmap({ events, theme }) {
  const ref = useRef();

  if (!events) {
    return (
      <div className="flex min-h-[274px] flex-col gap-4">
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
          GitHub Contribution Activity
        </h2>
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-300">
          This user has no activity to display.
        </div>
      </div>
    );
  }

  useEffect(() => {
    const margin = { top: 30, right: 20, bottom: 40, left: 36 };
    const cellSize = 16;
    const today = new Date();
    const startDate = d3.timeSunday.floor(d3.timeMonth.offset(today, -3));
    const endDate = d3.timeSunday.ceil(today);
    const allDays = d3.timeDays(startDate, endDate);
    const weeks = d3.groups(allDays, (d) => d3.timeWeek.count(startDate, d));
    const numWeeks = weeks.length;

    const width = numWeeks * cellSize + margin.left + margin.right;
    const height = 7 * cellSize + margin.top + margin.bottom;

    const svg = d3
      .select(ref.current)
      .html("")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const parseDate = d3.timeFormat("%Y-%m-%d");
    const toDateKey = (d) => d.toISOString().slice(0, 10); // always in UTC

    const counts = d3.rollup(
      events,
      (v) => v.length,
      (d) => toDateKey(new Date(d.created_at)),
    );

    const colorScale = d3
      .scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(
        theme === "dark"
          ? ["#3a3a3a", "#3f6846", "#4caf50", "#43d17a", "#a1f4c4"]
          : ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
      );

    // Y-labels
    const yLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
    g.selectAll("text.day")
      .data(yLabels)
      .join("text")
      .attr("x", -8)
      .attr("y", (_, i) => i * cellSize + cellSize / 1.5)
      .attr("text-anchor", "end")
      .attr("class", "text-sm fill-[#959da5] font-normal")
      .text((d) => d);

    // Month labels
    weeks.forEach(([_, days], i) => {
      const first = days[0];
      if (first.getDate() <= 7) {
        g.append("text")
          .attr("x", i * cellSize)
          .attr("y", -8)
          .attr("class", "text-sm fill-[#959da5] font-normal")
          .text(d3.timeFormat("%b")(first));
      }
    });

    // Tooltip
    const tooltip = d3
      .select(ref.current)
      .append("div")
      .attr(
        "class",
        "tooltip text-sm px-2 py-1 bg-white dark:bg-neutral-800 text-black dark:text-white border border-neutral-200 dark:border-neutral-700 rounded shadow ",
      )
      .style("position", "absolute")
      .style("opacity", 0)
      .style("pointer-events", "none");

    // Squares
    g.selectAll("g.week")
      .data(weeks)
      .join("g")
      .attr("transform", ([, days], i) => `translate(${i * cellSize},0)`)
      .selectAll("rect")
      .data(([, days]) => days)
      .join("rect")
      .attr("width", cellSize - 2.5)
      .attr("height", cellSize - 2.5)
      .attr("y", (d) => d.getDay() * cellSize)
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("fill", (d) => {
        const key = toDateKey(d);
        const val = counts.get(key);
        return colorScale(counts.get(key) || 0);
      })
      .on("mouseover", function (event, d) {
        const key = parseDate(d);
        tooltip
          .style("opacity", 1)
          .html(`${key}: ${counts.get(key) || 0} contributions`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 30 + "px");
      })
      .on("mouseout", () => tooltip.style("opacity", 0));

    // Add legend
    const legendColors = colorScale.range();
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left + 4}, ${height - margin.bottom + 10})`,
      );

    legend
      .append("text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("class", "text-sm fill-[#6e7781]")
      .text("Less");

    legend
      .selectAll("rect")
      .data(legendColors)
      .join("rect")
      .attr("x", (_, i) => 40 + i * (cellSize + 2))
      .attr("y", 0)
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("fill", (d) => d);

    legend
      .append("text")
      .attr("x", 40 + legendColors.length * (cellSize + 2) + 6)
      .attr("y", 10)
      .attr("class", "text-sm fill-[#6e7781]")
      .text("More");
  }, [events, theme]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        GitHub Contribution Activity
      </h2>
      <div
        ref={ref}
        className="flex w-full justify-center overflow-x-auto rounded-2xl bg-neutral-50 px-4 py-6 shadow-xl md:px-6 md:py-6 dark:bg-neutral-800"
      />
    </div>
  );
}

export default ThreeMonthHeatmap;
