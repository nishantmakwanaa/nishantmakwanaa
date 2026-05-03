// Blogs: optional inline `blogs` or `blog_json: true` + blog.json in the profile repo.

import type { PortfolioMain } from "@/types/portfolio-main";
import { GITHUB_BLOG_JSON_RAW } from "@/lib/github-profile-config";

export interface ContentBlock {
  type: "heading" | "text" | "image" | "left_half_frame" | "right_half_frame";
  text?: string;
  src?: string;
  image?: string;
  alt?: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  source: string;
  date: string;
  image_url: string | null;
  excerpt: string;
  content: ContentBlock[];
  sort_order: number;
}

function stringToBlocks(raw: string): ContentBlock[] {
  return raw.split("\n\n").filter(Boolean).map((para) => {
    const trimmed = para.trim();
    if (trimmed.startsWith("## ")) {
      return { type: "heading" as const, text: trimmed.replace(/^##\s+/, "") };
    }
    if (trimmed.startsWith("# ")) {
      return { type: "heading" as const, text: trimmed.replace(/^#\s+/, "") };
    }
    return { type: "text" as const, text: trimmed };
  });
}

export function mapJsonToBlogArticles(blogsData: unknown): BlogArticle[] {
  if (!Array.isArray(blogsData)) return [];
  return blogsData.map((article: Record<string, unknown>, i: number) => {
    const content: ContentBlock[] = Array.isArray(article.content)
      ? (article.content as ContentBlock[])
      : stringToBlocks((article.content as string) || "");

    return {
      id: String(article.slug ?? i),
      slug: String(article.slug ?? i),
      title: String(article.title ?? ""),
      source: String(article.source ?? "Blog"),
      date: String(article.date ?? ""),
      image_url: article.image != null ? String(article.image) : null,
      excerpt: String(article.excerpt ?? ""),
      content,
      sort_order: i,
    };
  });
}

/** Fetches blog.json only — use when README sets `"blog_json": true`. */
export async function fetchBlogArticlesFromRepoFile(): Promise<BlogArticle[]> {
  const res = await fetch(GITHUB_BLOG_JSON_RAW, {
    cache: "no-cache",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    return [];
  }
  try {
    const blogsData: unknown = await res.json();
    return mapJsonToBlogArticles(blogsData);
  } catch {
    return [];
  }
}

/**
 * Resolves articles from README portfolio data only (no network unless blog_json is true).
 */
export async function resolveBlogArticles(main: PortfolioMain): Promise<BlogArticle[]> {
  if (main.blogs !== undefined) {
    return mapJsonToBlogArticles(main.blogs);
  }
  if (main.blog_json === true) {
    return fetchBlogArticlesFromRepoFile();
  }
  return [];
}
