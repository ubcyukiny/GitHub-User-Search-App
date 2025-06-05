export const dummyUser = {
  name: "The Octocat",
  login: "octocat",
  created_at: "2011-01-25T00:00:00Z",
  avatar_url: "/assets/icon-user.png",
  bio: "This profile has no bio",
  public_repos: 8,
  followers: 3938,
  following: 9,
  blog: "https://github.blog",
  location: "San Francisco",
  twitter_username: null,
  company: "github",
};

export const dummyChart = [
  {
    language: "CSS",
    bytes: 15909,
  },
  {
    language: "HTML",
    bytes: 6611,
  },
  {
    language: "JavaScript",
    bytes: 105412,
  },
  {
    language: "Prolog",
    bytes: 4905,
  },
  {
    language: "PHP",
    bytes: 32075,
  },
  {
    language: "Python",
    bytes: 2966,
  },
];

export const dummyGraph = {
  nodes: [
    { id: "repo:weather-app", type: "repo", name: "weather-app", url: "#" },
    { id: "repo:todo-list", type: "repo", name: "todo-list", url: "#" },
    { id: "repo:portfolio", type: "repo", name: "portfolio", url: "#" },
    { id: "lang:JavaScript", type: "lang", name: "JavaScript" },
    { id: "lang:HTML", type: "lang", name: "HTML" },
    { id: "lang:CSS", type: "lang", name: "CSS" },
    { id: "lang:React", type: "lang", name: "React" },
  ],
  links: [
    { source: "repo:weather-app", target: "lang:JavaScript" },
    { source: "repo:weather-app", target: "lang:HTML" },
    { source: "repo:weather-app", target: "lang:CSS" },
    { source: "repo:todo-list", target: "lang:JavaScript" },
    { source: "repo:todo-list", target: "lang:React" },
    { source: "repo:portfolio", target: "lang:React" },
    { source: "repo:portfolio", target: "lang:CSS" },
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

export const dummyEvents = [
  { type: "PushEvent", created_at: "2024-06-01T12:00:00Z" },
  { type: "IssuesEvent", created_at: "2024-06-02T08:45:00Z" },
  { type: "PullRequestEvent", created_at: "2024-06-03T15:20:00Z" },
  { type: "PushEvent", created_at: "2024-06-03T18:30:00Z" },
  { type: "WatchEvent", created_at: "2024-06-04T11:00:00Z" },
  { type: "PushEvent", created_at: "2024-06-05T17:10:00Z" },
  { type: "ForkEvent", created_at: "2024-06-06T19:00:00Z" },
  { type: "PushEvent", created_at: "2024-06-07T10:15:00Z" },
  { type: "PullRequestEvent", created_at: "2024-06-07T13:45:00Z" },
  { type: "PushEvent", created_at: "2024-06-08T14:00:00Z" },
];
