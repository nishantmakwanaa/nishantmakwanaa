import type { PortfolioMain } from "@/types/portfolio-main";

export const GITHUB_USERNAME = "nishantmakwanaa";

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  homepage: string | null;
  fork?: boolean;
  owner: { login: string };
  stargazers_count?: number;
  topics?: string[];
  created_at?: string;
  updated_at?: string;
}

function getConfiguredGitHubToken(): string | null {
  const token = (import.meta as unknown as { env?: { VITE_GITHUB_TOKEN?: string } }).env
    ?.VITE_GITHUB_TOKEN;
  if (!token) return null;
  const trimmed = token.trim();
  return trimmed.length > 0 ? trimmed : null;
}

async function githubFetch<T>(path: string, token: string | null): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

async function githubGraphQLFetch<T>(query: string, token: string): Promise<T> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed (${response.status})`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  return data.data as T;
}

interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  primaryLanguage: { name: string } | null;
  stargazers: { totalCount: number };
  owner: { login: string };
  createdAt: string;
}

interface GraphQLPinnedResponse {
  user: {
    pinnedItems: {
      nodes: PinnedRepo[];
    };
  };
}

function mapGraphqlPinnedToRepos(repos: PinnedRepo[]): GitHubRepo[] {
  return repos.map((repo) => ({
    name: repo.name,
    description: repo.description,
    html_url: repo.url,
    language: repo.primaryLanguage?.name ?? null,
    homepage: repo.homepageUrl,
    owner: repo.owner,
    stargazers_count: repo.stargazers.totalCount,
    topics: [],
    created_at: repo.createdAt,
    updated_at: undefined,
  }));
}

async function fetchPinnedViaGraphQL(token: string): Promise<GitHubRepo[]> {
  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              primaryLanguage { name }
              stargazers { totalCount }
              owner { login }
              createdAt
            }
          }
        }
      }
    }
  `;
  const data = await githubGraphQLFetch<GraphQLPinnedResponse>(query, token);
  const repos = data.user.pinnedItems.nodes;
  return mapGraphqlPinnedToRepos(repos).sort((a, b) => a.name.localeCompare(b.name));
}

/** Recent non-fork repos (browser-safe — uses api.github.com, not github.com HTML). */
async function fetchRecentPublicRepos(username: string, limit: number): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=40&sort=pushed&type=owner`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  if (!res.ok) {
    console.warn("[fetchRecentPublicRepos] GitHub API failed:", res.status);
    return [];
  }
  const list = (await res.json()) as GitHubRepo[];
  if (!Array.isArray(list)) return [];
  const nonForks = list.filter(
    (r) => !r.fork && r.name !== GITHUB_USERNAME
  );
  return nonForks.slice(0, limit).sort((a, b) => a.name.localeCompare(b.name));
}

async function fetchReposByNames(repoNames: string[]): Promise<GitHubRepo[]> {
  const trimmed = repoNames.map((n) => n.trim()).filter(Boolean);
  const token = getConfiguredGitHubToken();
  const repos = await Promise.all(
    trimmed.map(async (name) => {
      try {
        return await githubFetch<GitHubRepo>(
          `/repos/${GITHUB_USERNAME}/${encodeURIComponent(name)}`,
          token
        );
      } catch {
        return null;
      }
    })
  );
  return repos.filter((r): r is GitHubRepo => r !== null);
}

/**
 * Load repos for the projects section. Never fetches github.com profile HTML (CORS blocks it in the browser).
 * 1) VITE_GITHUB_TOKEN + GraphQL pinned items
 * 2) README JSON `pinned_repos` names + REST
 * 3) REST: recent public non-fork repos
 */
export async function fetchReposForPortfolio(main: PortfolioMain): Promise<GitHubRepo[]> {
  const token = getConfiguredGitHubToken();

  if (token) {
    try {
      const pinned = await fetchPinnedViaGraphQL(token);
      if (pinned.length > 0) {
        console.log("[fetchReposForPortfolio] Using GraphQL pinned repos");
        return pinned;
      }
    } catch (e) {
      console.warn("[fetchReposForPortfolio] GraphQL pinned failed:", e);
    }
  }

  const fromReadme = main.pinned_repos?.map((n) => String(n).trim()).filter(Boolean) ?? [];
  if (fromReadme.length > 0) {
    const repos = await fetchReposByNames(fromReadme);
    if (repos.length > 0) {
      console.log("[fetchReposForPortfolio] Using pinned_repos from README JSON");
      return repos.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  console.log("[fetchReposForPortfolio] Using recent public repos (no HTML scrape)");
  return fetchRecentPublicRepos(GITHUB_USERNAME, 6);
}

export async function fetchRepoByName(repoName: string): Promise<GitHubRepo> {
  const token = getConfiguredGitHubToken();
  const path = `/repos/${GITHUB_USERNAME}/${encodeURIComponent(repoName)}`;

  try {
    return await githubFetch<GitHubRepo>(path, token);
  } catch (error) {
    if (token) {
      return githubFetch<GitHubRepo>(path, null);
    }
    throw error;
  }
}
