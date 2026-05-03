import { ArrowUpRight } from "lucide-react";
import { useAwards } from "@/hooks/usePortfolioData";

function normalizeExternalUrl(link: string): string {
  const trimmed = link.trim();
  if (/^[a-z]+:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

const AwardsSection = () => {
  const { data: awards, isPending, isError } = useAwards();

  if (isPending) {
    return (
      <div className="cv-section">
        <h2 className="section-title">Awards</h2>
        <div className="space-y-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="h-3 bg-muted rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="cv-section">
        <h2 className="section-title">Awards</h2>
        <p className="text-sm text-destructive">Could not load awards.</p>
      </div>
    );
  }

  if (!awards?.length) {
    return null;
  }

  return (
    <div className="cv-section">
      <h2 className="section-title">Awards</h2>
      <div className="space-y-6">
        {awards.map((award, i) => (
          <div key={award.id} className={`flex items-start justify-between ${i > 0 ? "pt-6 border-t border-border" : ""}`}>
            <div>
              <h3 className="font-semibold text-foreground text-[15px]">{award.title}</h3>
              <p className="text-[14px] text-muted-foreground mt-0.5">{award.issuer}</p>
            </div>
            {award.link ? (
              <a
                href={normalizeExternalUrl(award.link)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-foreground flex items-center gap-1 shrink-0 transition-all underline-fill"
              >
                Visit <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-[14px] text-muted-foreground flex items-center gap-1 shrink-0">—</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsSection;
