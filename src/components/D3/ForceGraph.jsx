import { useEffect, useRef } from "react";
import * as d3 from "d3";

function ForceGraph({ nodes, links, width = 800, height = 600 }) {
  const ref = useRef();

  useEffect(() => {
    if (!nodes.length || !links.length) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const langColor = d3
      .scaleOrdinal()
      .domain(nodes.filter((d) => d.type === "lang").map((d) => d.name))
      .range(d3.schemeSet2);
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(80),
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    const link = svg
      .append("g")
      .attr("stroke", "#aaa")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", (d) => (d.type === "repo" ? "#60abff" : langColor(d.name)))
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }),
      );

    node.append("title").text((d) => d.name);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    return () => simulation.stop();
  }, [nodes, links, width, height]);

  return <svg ref={ref} width={width} height={height} />;
}

export default ForceGraph;
