import {
  GITHUB_PROFILE_REPO,
  GITHUB_PROFILE_USERNAME,
  GITHUB_REPO_CONTENTS_API,
} from "@/lib/github-profile-config";

export interface ProfileResumeInfo {
  url: string | null;
  filename: string;
}

type GhContentItem = {
  name?: string;
  type?: string;
  download_url?: string | null;
};

function rawResumeUrl(filename: string): string {
  return `https://raw.githubusercontent.com/${GITHUB_PROFILE_USERNAME}/${GITHUB_PROFILE_REPO}/main/${encodeURIComponent(filename)}`;
}

/**
 * Finds a PDF in the profile repo root (prefers filename matching /resume/i).
 * Uses the GitHub contents API (CORS-enabled for GET).
 */
export async function fetchResumeFromProfileRepo(): Promise<ProfileResumeInfo> {
  try {
    const res = await fetch(GITHUB_REPO_CONTENTS_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!res.ok) {
      return { url: null, filename: "resume.pdf" };
    }
    const items: unknown = await res.json();
    if (!Array.isArray(items)) {
      return { url: null, filename: "resume.pdf" };
    }
    const pdfs = items.filter((item): item is GhContentItem => {
      if (typeof item !== "object" || item === null) return false;
      const o = item as GhContentItem;
      return (
        o.type === "file" &&
        typeof o.name === "string" &&
        /\.pdf$/i.test(o.name)
      );
    });
    if (pdfs.length === 0) {
      return { url: null, filename: "resume.pdf" };
    }
    const preferred =
      pdfs.find((f) => f.name && /resume/i.test(f.name)) ?? pdfs[0];
    const name = preferred.name ?? "resume.pdf";
    const url =
      preferred.download_url && typeof preferred.download_url === "string"
        ? preferred.download_url
        : rawResumeUrl(name);
    return { url, filename: name };
  } catch {
    return { url: null, filename: "resume.pdf" };
  }
}
