import { generateDummyEvents } from "../utils/generateDummyEvents";

export const dummyUser = {
  name: "The Octocat",
  login: "octocat",
  created_at: "2011-01-25T00:00:00Z",
  avatar_url: "/assets/icon-user.png",
  html_url: "https://github.com/octocat",
  bio: "Start by searching for any GitHub username to explore their profile, activity, and more.",
  public_repos: 8,
  followers: 3938,
  following: 9,
  blog: "https://github.blog",
  location: "San Francisco",
  twitter_username: null,
  company: "github",
};

export const dummyChart = [
  { language: "JavaScript", bytes: 90000 },
  { language: "Python", bytes: 32500 },
  { language: "Go", bytes: 32500 },
  { language: "Rust", bytes: 24000 },
  { language: "HTML", bytes: 24000 },
  { language: "CSS", bytes: 12000 },
  { language: "TypeScript", bytes: 12000 },
  { language: "C++", bytes: 6000 },
  { language: "Ruby", bytes: 2000 },
  { language: "PHP", bytes: 2000 },
];

export const dummyGraph = {
  nodes: [
    { id: "repo:weather-app", type: "repo", name: "weather-app", url: "#" },
    { id: "repo:todo-list", type: "repo", name: "todo-list", url: "#" },
    { id: "repo:portfolio", type: "repo", name: "portfolio", url: "#" },
    { id: "repo:chat-app", type: "repo", name: "chat-app", url: "#" },
    {
      id: "repo:finance-tracker",
      type: "repo",
      name: "finance-tracker",
      url: "#",
    },
    { id: "repo:game-engine", type: "repo", name: "game-engine", url: "#" },
    {
      id: "repo:data-visualizer",
      type: "repo",
      name: "data-visualizer",
      url: "#",
    },
    { id: "repo:ml-models", type: "repo", name: "ml-models", url: "#" },
    { id: "repo:cli-tool", type: "repo", name: "cli-tool", url: "#" },
    { id: "repo:api-server", type: "repo", name: "api-server", url: "#" },
    { id: "lang:JavaScript", type: "lang", name: "JavaScript" },
    { id: "lang:TypeScript", type: "lang", name: "TypeScript" },
    { id: "lang:Python", type: "lang", name: "Python" },
    { id: "lang:HTML", type: "lang", name: "HTML" },
    { id: "lang:CSS", type: "lang", name: "CSS" },
    { id: "lang:C++", type: "lang", name: "C++" },
    { id: "lang:Go", type: "lang", name: "Go" },
    { id: "lang:Rust", type: "lang", name: "Rust" },
    { id: "lang:PHP", type: "lang", name: "PHP" },
    { id: "lang:Ruby", type: "lang", name: "Ruby" },
  ],
  links: [
    { source: "repo:weather-app", target: "lang:JavaScript" },
    { source: "repo:weather-app", target: "lang:HTML" },
    { source: "repo:weather-app", target: "lang:CSS" },
    { source: "repo:todo-list", target: "lang:JavaScript" },
    { source: "repo:todo-list", target: "lang:TypeScript" },
    { source: "repo:portfolio", target: "lang:HTML" },
    { source: "repo:portfolio", target: "lang:CSS" },
    { source: "repo:portfolio", target: "lang:JavaScript" },
    { source: "repo:chat-app", target: "lang:TypeScript" },
    { source: "repo:chat-app", target: "lang:Go" },
    { source: "repo:finance-tracker", target: "lang:Python" },
    { source: "repo:finance-tracker", target: "lang:Ruby" },
    { source: "repo:game-engine", target: "lang:C++" },
    { source: "repo:game-engine", target: "lang:Rust" },
    { source: "repo:data-visualizer", target: "lang:JavaScript" },
    { source: "repo:data-visualizer", target: "lang:Python" },
    { source: "repo:ml-models", target: "lang:Python" },
    { source: "repo:ml-models", target: "lang:Go" },
    { source: "repo:cli-tool", target: "lang:Rust" },
    { source: "repo:cli-tool", target: "lang:C++" },
    { source: "repo:api-server", target: "lang:PHP" },
    { source: "repo:api-server", target: "lang:Go" },
  ],
};

export const dummyTopRepos = [
  {
    id: 1,
    name: "portfolio-website",
    description: "My personal portfolio built with React and Tailwind.",
    html_url: "https://github.com/example/portfolio-website",
    stargazers_count: 42,
    language: "JavaScript",
  },
  {
    id: 2,
    name: "github-visualizer",
    description: "An app that visualizes GitHub data using D3.js.",
    html_url: "https://github.com/example/github-visualizer",
    stargazers_count: 76,
    language: "TypeScript",
  },
  {
    id: 3,
    name: "bmi-meal-planner",
    description: "Track BMI and generate meal plans using OpenAI API.",
    html_url: "https://github.com/example/bmi-meal-planner",
    stargazers_count: 23,
    language: "Python",
  },
];

export const dummyEvents = generateDummyEvents();

export const dummyPinned = [
  {
    name: "github-visualizer",
    description:
      "A dynamic GitHub profile analyzer built with React and D3.js.",
    url: "https://github.com/ubcyukiny/github-visualizer",
    stargazerCount: 42,
    forkCount: 12,
    primaryLanguage: {
      name: "JavaScript",
      color: "#f1e05a",
    },
  },
  {
    name: "spotify-viz",
    description: "Visualize your Spotify listening habits using D3 charts.",
    url: "https://github.com/ubcyukiny/spotify-viz",
    stargazerCount: 17,
    forkCount: 5,
    primaryLanguage: {
      name: "TypeScript",
      color: "#3178c6",
    },
  },
  {
    name: "bmi-meal-planner",
    description: "Track BMI and generate AI meal plans based on goals.",
    url: "https://github.com/ubcyukiny/bmi-meal-planner",
    stargazerCount: 9,
    forkCount: 2,
    primaryLanguage: {
      name: "React",
      color: "#61dafb",
    },
  },
  {
    name: "blog-preview-card",
    description:
      "Frontend Mentor challenge using Tailwind CSS and semantic HTML.",
    url: "https://github.com/ubcyukiny/blog-preview-card",
    stargazerCount: 4,
    forkCount: 1,
    primaryLanguage: {
      name: "HTML",
      color: "#e34c26",
    },
  },
];

export const dummyFollowers = [
  {
    login: "sindresorhus",
    name: "Sindre Sorhus",
    avatar_url: "https://avatars.githubusercontent.com/u/170270?v=4",
    html_url: "https://github.com/sindresorhus",
    bio: "Creator of awesome lists, countless npm packages, and open source advocate.",
    followers: 49000,
    following: 0,
  },
  {
    login: "torvalds",
    name: "Linus Torvalds",
    avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
    html_url: "https://github.com/torvalds",
    bio: "Creator of Linux. Writes code that changes the world.",
    followers: 160000,
    following: 0,
  },
  {
    login: "gaearon",
    name: "Dan Abramov",
    avatar_url: "https://avatars.githubusercontent.com/u/810438?v=4",
    html_url: "https://github.com/gaearon",
    bio: "Working on React at Meta. Always learning.",
    followers: 87000,
    following: 150,
  },
  {
    login: "yyx990803",
    name: "Evan You",
    avatar_url: "https://avatars.githubusercontent.com/u/499550?v=4",
    html_url: "https://github.com/yyx990803",
    bio: "Creator of Vue.js, former Google engineer, coffee drinker.",
    followers: 90000,
    following: 48,
  },
];
