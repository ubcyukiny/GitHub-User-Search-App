import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { getLanguageColor } from "../../utils/colorUtils";

const DonutChart = ({ data }) => {
  const ref = useRef();
  const width = 300;
  const height = 300;
  const margin = 20;
  const radius = Math.min(width, height) / 2 - margin;
  const sortedData = Array.isArray(data)
    ? [...data].sort((a, b) => b.bytes - a.bytes)
    : [];

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create the pie layout from array data
    const pie = d3.pie().value((d) => d.bytes);
    const arc = d3.arc().innerRadius(100).outerRadius(radius);
    const pieData = pie(sortedData);

    g.selectAll("path")
      .data(pieData)
      .enter()
      .append("path")
      .attr("fill", (d) => getLanguageColor(d.data.language))
      .style("opacity", 0.7)
      .each(function (d) {
        this._current = { startAngle: 0, endAngle: 0 };
      })
      .on("mouseover", function (event, d) {
        d3.select(this).style("opacity", 1);
        const total = d3.sum(data, (d) => d.bytes);
        const percent = ((d.data.bytes / total) * 100).toFixed(1);
        const [x, y] = d3.pointer(event, ref.current);
        d3.select("#tooltip")
          .style("left", `${x}px`)
          .style("top", `${y}px`)
          .style("opacity", 1)
          .style("display", "block")
          .html(`${d.data.language}: ${percent}%`);
      })
      .on("mousemove", function (event) {
        const [x, y] = d3.pointer(event, ref.current);
        d3.select("#tooltip").style("left", `${x}px`).style("top", `${y}px`);
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.7);
        d3.select("#tooltip").style("opacity", 0).style("display", "none");
      })
      .transition()
      .duration(900)
      .attrTween("d", function (d) {
        const i = d3.interpolate(this._current, d);
        this._current = i(1);
        return (t) => arc(i(t));
      });
  }, [data]);

  if (!data || data.length == 0) {
    return (
      <div className="relative flex min-h-[522px] flex-col gap-4">
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
          Language Usage (Recent 20 Repos)
        </h2>
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-300">
          This user has no language data to display.
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col">
      <h2 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-white">
        Language Usage (Recent 20 Repos)
      </h2>
      <div className="flex justify-center">
        <svg ref={ref} className="h-auto w-full max-w-96" />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {sortedData.slice(0, 10).map((d) => (
          <div key={d.language} className="flex items-center gap-2 text-sm">
            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: getLanguageColor(d.language),
              }}
            />
            <span className="text-neutral-700 dark:text-neutral-200">
              {d.language}
            </span>
          </div>
        ))}
      </div>
      <div
        id="tooltip"
        className="pointer-events-none absolute z-50 rounded border border-neutral-200 bg-white px-2 py-1 text-sm text-black shadow transition-opacity duration-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
        style={{ opacity: 0 }}
      ></div>
    </div>
  );
};

export default DonutChart;
