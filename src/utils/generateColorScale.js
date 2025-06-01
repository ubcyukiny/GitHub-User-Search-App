import * as d3 from "d3";

export default function generateColorScale(languageList) {
  return d3
    .scaleOrdinal()
    .domain(languageList)
    .range(d3.schemeSet3.concat(d3.schemeTableau10)); // 22 distinct colors
}
