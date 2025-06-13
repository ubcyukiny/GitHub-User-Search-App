/**
 * Adapted from Mike Bostock's ForceGraph example
 * https://observablehq.com/@d3/force-directed-graph
 * © 2021 Observable, Inc. Licensed under MIT license
 */

import { useEffect, useRef } from "react";
import { getLanguageColor } from "../../utils/colorUtils";
import * as d3 from "d3";

function ForceGraph({ nodes, links, width = 800, height = 600 }) {
  const ref = useRef();
  const screenWidth = window.innerWidth;
  const effectiveRadius = screenWidth < 500 ? 12 : 13;
  const tooltipOffsetX = 140;
  const tooltipOffsetY = 450;
  const updateTooltipPosition = (event) => {
    const [x, y] = d3.pointer(event, ref.current);
    d3.select("#tooltip")
      .style("left", `${x + tooltipOffsetX}px`)
      .style("top", `${y + tooltipOffsetY}px`);
  };
  useEffect(() => {
    if (!nodes.length || !links.length) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(80),
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(effectiveRadius + 2))
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
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", effectiveRadius)
      .attr("fill", (d) =>
        d.type === "repo" ? "#ffffff" : getLanguageColor(d.name),
      )
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

    node
      .on("mouseover", (event, d) => {
        updateTooltipPosition(event);

        d3.select("#tooltip")
          .style("opacity", 1)
          .html(
            d.type === "repo"
              ? `<strong>Repo:</strong> ${d.name}<br/><a href="${d.url}" target="_blank" class="text-blue-500 underline">Open ↗</a>`
              : `<strong>Language:</strong> ${d.name}`,
          );
      })
      .on("mousemove", updateTooltipPosition)
      .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      });
    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node
        .attr(
          "cx",
          (d) =>
            (d.x = Math.max(
              effectiveRadius,
              Math.min(width - effectiveRadius, d.x),
            )),
        )
        .attr(
          "cy",
          (d) =>
            (d.y = Math.max(
              effectiveRadius,
              Math.min(height - effectiveRadius, d.y),
            )),
        );
    }

    return () => simulation.stop();
  }, [nodes, links, width, height]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-white">
        Language–Repo Force Graph
      </h2>
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto" }}
      />
      <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-300">
        Each repo links to its top language. Drag nodes to explore the graph.
      </p>
      <div
        id="tooltip"
        className="pointer-events-none fixed z-50 rounded-md bg-white px-3 py-2 text-sm text-neutral-800 opacity-0 shadow-lg ring-1 ring-gray-200 transition-opacity duration-200 dark:bg-neutral-800 dark:text-white dark:ring-white/20"
      ></div>
    </div>
  );
}

export default ForceGraph;
