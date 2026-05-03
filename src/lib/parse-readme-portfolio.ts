import type { PortfolioMain } from "@/types/portfolio-main";

function isPortfolioShape(v: unknown): v is PortfolioMain {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  const hero = o.hero;
  if (!hero || typeof hero !== "object") return false;
  if (typeof (hero as { name?: unknown }).name !== "string") return false;
  if (!Array.isArray(o.about)) return false;
  return true;
}

/**
 * Extracts portfolio JSON from a GitHub profile README.
 * Strips HTML comments first — comments often mention ```json and would break a naive regex.
 * Tries every ```json fence until one parses as PortfolioMain.
 */
export function parsePortfolioJsonFromReadme(markdown: string): PortfolioMain {
  const withoutComments = markdown.replace(/<!--[\s\S]*?-->/g, "");
  const re = /```json\s*([\s\S]*?)```/g;
  const candidates: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(withoutComments)) !== null) {
    candidates.push(m[1].trim());
  }

  if (candidates.length === 0) {
    throw new Error("Profile README has no ```json code block with portfolio data.");
  }

  for (const raw of candidates) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (isPortfolioShape(parsed)) {
        return parsed;
      }
    } catch {
      continue;
    }
  }

  throw new Error(
    "Profile README has ```json blocks but none contain valid portfolio JSON (expected hero.name and about[])."
  );
}
