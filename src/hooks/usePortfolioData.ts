import { useQuery, useQueryClient } from "@tanstack/react-query";
import { resolveBlogArticles } from "@/lib/blogs";
import { loadProjects } from "@/lib/projects";
import { fetchPortfolioMainFromReadme } from "@/lib/fetch-github-profile";
import { fetchResumeFromProfileRepo } from "@/lib/fetch-profile-resume";
import { PORTFOLIO_QUERY_KEY } from "@/lib/portfolio-query-key";
import {
  toHeroInfo,
  toAboutData,
  toExperienceData,
  toEducationData,
  toActivitiesData,
  toStackData,
  toAwardsData,
  toSocialLinks,
  toContactInfo,
} from "@/lib/portfolio-data";

const STALE_MS = 5 * 60 * 1000;

export const useAbout = () =>
  useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolioMainFromReadme,
    select: toAboutData,
    staleTime: STALE_MS,
  });

export const useExperience = () =>
  useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolioMainFromReadme,
    select: toExperienceData,
    staleTime: STALE_MS,
  });

export const useEducation = () =>
  useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolioMainFromReadme,
    select: toEducationData,
    staleTime: STALE_MS,
  });

export const useActivities = () =>
  useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolioMainFromReadme,
    select: toActivitiesData,
    staleTime: STALE_MS,
  });

export const useAwards = () =>
  useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolioMainFromReadme,
    select: toAwardsData,
    staleTime: STALE_MS,
  });

export const useArticles = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["articles", "readme-resolved"],
    queryFn: async () => {
      const main = await queryClient.ensureQueryData({
        queryKey: PORTFOLIO_QUERY_KEY,
        queryFn: fetchPortfolioMainFromReadme,
      });
      return resolveBlogArticles(main);
    },
    staleTime: STALE_MS,
  });
};

export const useArticleBySlug = (slug: string | undefined) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["articles", "readme-resolved"],
    queryFn: async () => {
      const main = await queryClient.ensureQueryData({
        queryKey: PORTFOLIO_QUERY_KEY,
        queryFn: fetchPortfolioMainFromReadme,
      });
      return resolveBlogArticles(main);
    },
    select: (articles) => articles.find((a) => a.slug === slug) || null,
    enabled: !!slug,
    staleTime: STALE_MS,
  });
};

export const useStack = () =>
  useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolioMainFromReadme,
    select: toStackData,
    staleTime: STALE_MS,
  });

export const useHeroInfo = () =>
  useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolioMainFromReadme,
    select: toHeroInfo,
    staleTime: STALE_MS,
  });

export const useSocialLinks = (section: string) =>
  useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolioMainFromReadme,
    select: (main) => toSocialLinks(main, section),
    staleTime: STALE_MS,
  });

export const useContactInfo = () =>
  useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolioMainFromReadme,
    select: toContactInfo,
    staleTime: STALE_MS,
  });

export const useResumeInfo = () =>
  useQuery({
    queryKey: ["resume", "github-profile-repo"],
    queryFn: fetchResumeFromProfileRepo,
    staleTime: 15 * 60 * 1000,
  });

export const useProjects = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["projects", "readme-pinned"],
    queryFn: () => loadProjects(queryClient),
    staleTime: 5 * 60 * 1000,
  });
};
