import * as d3 from "d3";
import { useEffect, useRef } from "react";

const DonutChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    console.log("DonutChart received new data:", data);

    if (!Array.isArray(data) || data.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 300;
    const margin = 20;
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.

    const radius = Math.min(width, height) / 2 - margin;

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)

      .attr("preserveAspectRatio", "xMidYMid meet");

    // Append <g> and center it
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create the pie layout from array data
    const pie = d3.pie().value((d) => d.bytes);
    const data_ready = pie(data);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.language))
      .range(d3.schemeSet2);
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.

    g.selectAll("path")
      .data(data_ready)
      .join("path")
      .attr("fill", (d) => color(d.data.language))
      .style("opacity", 0.7)
      .transition()
      .duration(900)
      .attrTween("d", function (d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        const arc = d3.arc().innerRadius(100).outerRadius(radius);
        return function (t) {
          return arc(i(t));
        };
      });

    const arcLabel = d3
      .arc()
      .innerRadius(radius * 1.15)
      .outerRadius(radius * 1.15);

    // Add labels
    g.selectAll("text.label")
      .data(data_ready.filter((d) => d.endAngle - d.startAngle > 0.2))
      .join("text")
      .attr("class", "label")
      .text((d) => d.data.language)
      .attr("transform", (d) => {
        const [x, y] = arcLabel.centroid(d);
        return `translate(${x}, ${y})`;
      })
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("font-size", "10px")
      .style("fill", "#000");
  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-white">
        Language Usage (Top 10 Repos)
      </h2>
      <svg ref={ref} className="h-auto w-full" />
    </div>
  );
};

export default DonutChart;
