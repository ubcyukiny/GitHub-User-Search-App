// src/components/D3/BarChart.jsx
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const BarChart = ({ data }) => {
  if (!Array.isArray(data)) {
    console.error("Expected array for BarChart data, got:", data);
    return null;
  }
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = 400;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.language))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.bytes)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal(d3.schemeSet2);

    // Bars
    svg
      .attr("viewBox", [0, 0, width, height])
      .append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.language))
      .attr("y", (d) => y(d.bytes))
      .attr("height", (d) => y(0) - y(d.bytes))
      .attr("width", x.bandwidth())
      .attr("fill", (d) => color(d.language))
      .append("title")
      .text((d) => `${d.language}: ${d.bytes.toLocaleString()} bytes`);

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end")
      .style("font-size", "12px");

    // Y Axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px");
  }, [data]);

  return <svg ref={ref} className="h-auto w-full"></svg>;
};

export default BarChart;
