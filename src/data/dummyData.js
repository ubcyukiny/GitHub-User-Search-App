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
  { created_at: "2025-04-20T12:00:00Z" },
  { created_at: "2025-04-21T08:45:00Z" },
  { created_at: "2025-04-22T15:20:00Z" },
  { created_at: "2025-05-02T18:30:00Z" },
  { created_at: "2025-05-12T11:00:00Z" },
  { created_at: "2025-05-14T17:10:00Z" },
  { created_at: "2025-05-20T09:15:00Z" },
  { created_at: "2025-05-21T14:30:00Z" },
  { created_at: "2025-05-22T10:45:00Z" },
  { created_at: "2025-05-23T16:00:00Z" },
  { created_at: "2025-05-23T18:00:00Z" },
  { created_at: "2025-05-24T12:20:00Z" },
  { created_at: "2025-05-25T11:00:00Z" },
  { created_at: "2025-05-25T13:45:00Z" },
  { created_at: "2025-05-26T15:10:00Z" },
  { created_at: "2025-05-27T09:30:00Z" },
  { created_at: "2025-05-28T14:50:00Z" },
  { created_at: "2025-05-29T08:40:00Z" },
  { created_at: "2025-05-30T13:00:00Z" },
  { created_at: "2025-05-31T17:15:00Z" },
  { created_at: "2025-06-01T10:00:00Z" },
  { created_at: "2025-06-01T14:00:00Z" },
  { created_at: "2025-06-02T09:45:00Z" },
  { created_at: "2025-06-02T16:20:00Z" },
  { created_at: "2025-06-03T13:15:00Z" },
  { created_at: "2025-06-04T11:40:00Z" },
  { created_at: "2025-06-05T18:30:00Z" },
  { created_at: "2025-06-06T08:00:00Z" },
  { created_at: "2025-06-07T09:10:00Z" },
  { created_at: "2025-06-08T12:25:00Z" },
  { created_at: "2025-06-08T17:00:00Z" },
  { created_at: "2025-06-09T15:50:00Z" },
  { created_at: "2025-06-10T10:10:00Z" },
];

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
    login: "octocat",
    name: "The Octocat",
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    html_url: "https://github.com/octocat",
    bio: "GitHub's official mascot and your friendly octopussicorn.",
    followers: 1120,
    following: 12,
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
