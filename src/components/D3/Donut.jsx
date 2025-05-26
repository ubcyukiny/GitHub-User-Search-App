import * as d3 from "d3";
import { useEffect, useRef } from "react";

const DonutChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
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
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create dummy data
    const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };

    // set the color scale
    const color = d3
      .scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

    // Compute the position of each group on the pie:
    const pie = d3.pie().value((d) => d[1]);

    const data_ready = pie(Object.entries(data));

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.

    g.selectAll("path")
      .data(data_ready)
      .join("path")
      .attr("d", d3.arc().innerRadius(100).outerRadius(radius))
      .attr("fill", (d) => color(d.data[0]))
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);
    // svg
    //   .selectAll("whatever")
    //   .data(data_ready)
    //   .join("path")
    //   .attr(
    //     "d",
    //     d3
    //       .arc()
    //       .innerRadius(100) // This is the size of the donut hole
    //       .outerRadius(radius),
    //   )
    //   .attr("fill", (d) => color(d.data[0]))
    //   .attr("stroke", "black")
    //   .style("stroke-width", "2px")
    //   .style("opacity", 0.7);
  }, [data]);

  return <svg ref={ref} className="h-auto w-full"></svg>;
};

export default DonutChart;
