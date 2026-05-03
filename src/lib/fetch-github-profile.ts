import { GITHUB_README_RAW } from "@/lib/github-profile-config";
import { parsePortfolioJsonFromReadme } from "@/lib/parse-readme-portfolio";
import type { PortfolioMain } from "@/types/portfolio-main";
import portfolioFallback from "@/data/portfolio-fallback.json";

export async function fetchPortfolioMainFromReadme(): Promise<PortfolioMain> {
  try {
    const res = await fetch(GITHUB_README_RAW, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const markdown = await res.text();
    return parsePortfolioJsonFromReadme(markdown);
  } catch (e) {
    console.warn("[portfolio] README fetch/parse failed, using bundled fallback:", e);
    return portfolioFallback as PortfolioMain;
  }
}
