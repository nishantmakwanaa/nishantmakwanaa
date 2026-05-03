import type { QueryClient } from "@tanstack/react-query";
import { fetchReposForPortfolio, type GitHubRepo } from "@/lib/github";
import { fetchPortfolioMainFromReadme } from "@/lib/fetch-github-profile";
import { PORTFOLIO_QUERY_KEY } from "@/lib/portfolio-query-key";

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image_url: string;
  github_url: string;
  live_url: string | null;
  description: string | null;
  language: string | null;
  created_at: string | undefined;
}

function formatRepoName(name: string): string {
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function repoToProject(repo: GitHubRepo): Project {
  const homepage = repo.homepage?.trim() || null;
  const screenshotUrl = homepage
    ? `https://api.microlink.io/?url=${encodeURIComponent(homepage)}&screenshot=true&meta=false&embed=screenshot.url`
    : `https://api.microlink.io/?url=${encodeURIComponent(repo.html_url)}&screenshot=true&meta=false&embed=screenshot.url`;

  return {
    id: repo.name,
    slug: repo.name,
    title: formatRepoName(repo.name),
    subtitle: "Website",
    image_url: screenshotUrl,
    github_url: repo.html_url,
    live_url: homepage,
    description: repo.description,
    language: repo.language,
    created_at: repo.created_at,
  };
}

// Always true — we rely on pinned repos existing on the GitHub profile
export const hasProjects = true;

export async function loadProjects(queryClient: QueryClient): Promise<Project[]> {
  const main = await queryClient.ensureQueryData({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolioMainFromReadme,
  });
  const repos = await fetchReposForPortfolio(main);
  return repos.map(repoToProject);
}
