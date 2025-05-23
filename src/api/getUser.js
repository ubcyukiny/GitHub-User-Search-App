import { Octokit } from "@octokit/core";
// https://github.com/octokit/core.js#readme

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_TOKEN });

export const fetchGitHubUser = async (username) => {
  return await octokit.request("GET /users/{username}", {
    username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};
