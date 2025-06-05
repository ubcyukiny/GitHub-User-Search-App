import { useEffect, useRef } from "react";
import * as d3 from "d3";

function ActivityHeatmap({ events }) {
  const ref = useRef();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const margin = { top: 60, right: 10, bottom: 10, left: 30 };
    const cellSize = 14;
    const today = new Date();
    const startDate = d3.timeSunday.floor(d3.timeMonth.offset(today, -1));
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

    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", 30)
      .attr("font-size", 18)
      .attr("font-weight", "bold")
      .attr("fill", isDark ? "#ffffff" : "#000000")
      .text(d3.timeFormat("%B")(today));

    const parseDate = d3.timeFormat("%Y-%m-%d");
    const counts = d3.rollup(
      events,
      (v) => v.length,
      (d) => parseDate(new Date(d.created_at)),
    );

    const maxCount = d3.max(counts.values());
    const color = d3
      .scaleLinear()
      .domain([0, maxCount || 1]) // avoid NaN if no data
      .range(
        isDark
          ? ["#1e3a8a", "#60a5fa"] // dark blue to light blue
          : ["#dbeafe", "#3b82f6"], // light blue to blue
      )
      .interpolate(d3.interpolateLab); // smooth color transition

    const tooltip = d3
      .select(ref.current)
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", isDark ? "#1f2937" : "white")
      .style("color", isDark ? "white" : "black")
      .style("padding", "6px 10px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    const yLabels = ["", "M", "", "W", "", "F", ""];
    g.selectAll("text.day")
      .data(yLabels)
      .join("text")
      .attr("x", -6)
      .attr("y", (_, i) => i * cellSize + cellSize / 1.4)
      .attr("text-anchor", "end")
      .attr("class", "text-xs fill-neutral-400 dark:fill-neutral-300")
      .text((d) => d);

    g.selectAll("g.week")
      .data(weeks)
      .join("g")
      .attr("transform", ([, days], i) => `translate(${i * cellSize},0)`)
      .selectAll("rect")
      .data(([, days]) => days)
      .join("rect")
      .attr("width", cellSize - 1)
      .attr("height", cellSize - 1)
      .attr("y", (d) => d.getDay() * cellSize)
      .attr("fill", (d) => {
        const key = parseDate(d);
        return color(counts.get(key) || 0);
      })
      .on("mouseover", function (event, d) {
        const key = parseDate(d);
        tooltip
          .style("opacity", 1)
          .html(`${key}: ${counts.get(key) || 0} events`)
          .style("left", event.pageX + 12 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", () => tooltip.style("opacity", 0));
  }, [events]);

  return <div ref={ref} />;
}

export default ActivityHeatmap;
