import * as d3 from "d3";
import { useEffect, useRef } from "react";

function DonutChartSkeleton() {
  const ref = useRef();
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2 - 20;

  useEffect(() => {
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

    const arc = d3.arc().innerRadius(100).outerRadius(radius);

    g.append("path")
      .attr("d", arc({ startAngle: 0, endAngle: 2 * Math.PI }))
      .attr("fill", "#3f3f3f")
      .attr("class", "animate-pulse");
  }, []);

  return (
    <div className="relative flex flex-col">
      <h2 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-white">
        Language Usage (Recent 20 Repos)
      </h2>
      <div className="flex justify-center">
        <svg ref={ref} className="h-auto w-full max-w-96" />
      </div>

      {/* Legend placeholder */}
      <div className="mt-4 flex animate-pulse flex-wrap justify-center gap-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-4 w-16 rounded bg-neutral-300 dark:bg-neutral-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChartSkeleton;
