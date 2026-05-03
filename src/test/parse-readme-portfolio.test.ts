import { describe, it, expect } from "vitest";
import { parsePortfolioJsonFromReadme } from "@/lib/parse-readme-portfolio";

describe("parsePortfolioJsonFromReadme", () => {
  it("ignores ```json inside HTML comments and parses the real block", () => {
    const md = `<!--
  Portfolio: the fenced \`\`\`json block below.
-->
# Hi

\`\`\`json
{"not": "portfolio"}
\`\`\`

\`\`\`json
{
  "hero": { "name": "Test User", "role": "Dev", "location": "X", "email": "a@b.co" },
  "about": ["Hello"],
  "experience": [],
  "education": [],
  "activities": [],
  "stack": [],
  "awards": [],
  "social_links": { "hero": [], "contact": [] },
  "contact": { "email": "a@b.co", "timezone": "UTC" }
}
\`\`\`
`;
    const parsed = parsePortfolioJsonFromReadme(md);
    expect(parsed.hero.name).toBe("Test User");
    expect(parsed.about[0]).toBe("Hello");
  });
});
