import * as d3 from "d3";

// Known language colors (GitHub)
const KNOWN_LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Shell: "#89e051",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Lua: "#000080",
  R: "#198CE7",
  ObjectiveC: "#438eff",
};

// Extra fallback colors
const fallbackColors = d3.scaleOrdinal([
  ...d3.schemeTableau10,
  ...d3.schemeSet3,
  ...d3.schemeDark2,
  "#999999",
  "#cccccc",
  "#666666",
]);

const fallbackMap = new Map();
let fallbackIndex = 0;

export function getLanguageColor(lang) {
  if (!lang) return "#999";

  if (KNOWN_LANGUAGE_COLORS[lang]) {
    return KNOWN_LANGUAGE_COLORS[lang];
  }

  if (!fallbackMap.has(lang)) {
    fallbackMap.set(lang, fallbackColors(fallbackIndex++));
  }

  return fallbackMap.get(lang);
}
