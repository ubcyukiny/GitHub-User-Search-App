import { Octokit } from "@octokit/core";
import { graphql } from "@octokit/graphql";

const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_TOKEN });

export const getUser = async (username) => {
  return await octokit.request("GET /users/{username}", {
    username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};

export const getRepos = async (username) => {
  return await octokit.request("GET /users/{username}/repos", {
    username,
    per_page: 50,
  });
};

export const getFollowers = async (username) => {
  return await octokit.request("GET /users/{username}/followers", {
    username,
    per_page: 10,
  });
};

export const getRepoLanguages = async (username, repoName) => {
  return await octokit.request("GET /repos/{owner}/{repo}/languages", {
    owner: username,
    repo: repoName,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};

export const buildForceGraphData = async (username) => {
  const response = await getRepos(username);

  const repos = response?.data ?? [];

  const nodes = [];
  const links = [];
  const langSet = new Set();

  const topRepos = repos.filter((r) => !r.fork).slice(0, 20);

  for (const repo of topRepos) {
    const repoId = `repo:${repo.name}`;
    nodes.push({
      id: repoId,
      type: "repo",
      name: repo.name,
      url: repo.html_url,
    });

    const { data: langObj } = await getRepoLanguages(username, repo.name);

    for (const lang in langObj) {
      const langId = `lang:${lang}`;
      if (!langSet.has(lang)) {
        nodes.push({
          id: langId,
          type: "lang",
          name: lang,
        });
        langSet.add(lang);
      }

      links.push({
        source: repoId,
        target: langId,
      });
    }
  }
  return { nodes, links };
};

export const getUserEvents = async (username) => {
  return await octokit.request("GET /users/{username}/events/public", {
    username,
    per_page: 100,
  });
};

const PINNED_REPOS_QUERY = `query($username: String!) {
  user(login: $username) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
}`;

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

export const getPinnedRepos = async (username) => {
  const res = await graphqlWithAuth(PINNED_REPOS_QUERY, { username });
  return res.user.pinnedItems.nodes;
};
