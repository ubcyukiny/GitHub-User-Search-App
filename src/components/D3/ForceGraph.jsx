/**
 * Adapted from Mike Bostock's ForceGraph example
 * https://observablehq.com/@d3/force-directed-graph
 * © 2021 Observable, Inc. Licensed under MIT license
 */

import { useEffect, useRef, useState } from "react";
import { getLanguageColor } from "../../utils/colorUtils";
import * as d3 from "d3";

function ForceGraph({ nodes, links, theme }) {
  if (!nodes || !links) {
    return (
      <div className="relative flex min-h-[500px] flex-col gap-4">
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
          Language–Repo Force Graph
        </h2>
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-300">
          No data available for force graph visualization.
        </div>
      </div>
    );
  }

  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [fadingOut, setFadingOut] = useState(false);
  const previousNodes = useRef([]);
  const ref = useRef();
  const effectiveRadius = 6;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      setDimensions({ width, height: width });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nodes.length || !links.length || dimensions.width === 0) return;

    const hasChanged =
      JSON.stringify(previousNodes.current.map((n) => n.id).sort()) !==
      JSON.stringify(nodes.map((n) => n.id).sort());

    const svg = d3.select(ref.current);

    if (hasChanged) {
      setFadingOut(true); // Step 1: fade out
      setTimeout(() => {
        drawGraph(); // Step 2: draw new
        setFadingOut(false); // Step 3: fade back in
        previousNodes.current = nodes;
      }, 300);
    } else {
      drawGraph();
      previousNodes.current = nodes;
    }

    function drawGraph() {
      svg.selectAll("*").remove();

      svg
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink(links)
            .id((d) => d.id)
            .distance(35),
        )
        .force("charge", d3.forceManyBody().strength(-20))
        .force(
          "center",
          d3.forceCenter(dimensions.width / 2, dimensions.height / 2),
        )
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
          d.type === "repo"
            ? theme === "dark"
              ? "#ffffff"
              : "#8b949e"
            : getLanguageColor(d.name),
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
        )
        .on("mouseover", (event, d) => {
          const [x, y] = d3.pointer(event, ref.current);
          d3.select("#tooltip")
            .style("left", `${Math.min(x + 25, dimensions.width - 100)}px`)
            .style("top", `${Math.max(y + 505, 0)}px`)
            .style("opacity", 1)
            .style("display", "block")
            .html(
              d.type === "repo"
                ? `<strong>Repo:</strong> ${d.name}<br/>`
                : `<strong>Language:</strong> ${d.name}`,
            );
        })
        .on("mousemove", (event) => {
          const [x, y] = d3.pointer(event, ref.current);
          d3.select("#tooltip")
            .style("left", `${Math.min(x + 25, dimensions.width - 100)}px`)
            .style("top", `${Math.max(y + 505, 0)}px`);
        })
        .on("mouseout", () => {
          d3.select("#tooltip").style("opacity", 0).style("display", "none");
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
                Math.min(dimensions.width - effectiveRadius, d.x),
              )),
          )
          .attr(
            "cy",
            (d) =>
              (d.y = Math.max(
                effectiveRadius,
                Math.min(dimensions.height - effectiveRadius, d.y),
              )),
          );
      }

      return () => simulation.stop();
    }
  }, [nodes, links, dimensions.width, dimensions.height, theme]);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-4">
      <h2 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-white">
        Language–Repo Force Graph
      </h2>
      <svg
        ref={ref}
        className={`h-auto w-full max-w-96 transition-opacity duration-500 ${
          fadingOut ? "opacity-0" : "opacity-100"
        }`}
      />
      <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-300">
        Each repo links to its top language. Drag nodes to explore the graph.
      </p>
      <div
        id="tooltip"
        className="pointer-events-none absolute z-50 rounded border border-neutral-200 bg-white px-2 py-1 text-sm text-black shadow transition-opacity duration-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
        style={{ opacity: 0 }}
      ></div>
    </div>
  );
}

export default ForceGraph;
