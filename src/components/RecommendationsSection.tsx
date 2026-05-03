import { useActivities } from "@/hooks/usePortfolioData";

const RecommendationsSection = () => {
  const { data: activities, isLoading } = useActivities();

  if (isLoading || !activities) {
    return (
      <div className="cv-section">
        <h2 className="section-title">Activities & Leadership</h2>
        <div className="space-y-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-1/4" />
              <div className="h-4 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="cv-section">
      <h2 className="section-title">Activities & Leadership</h2>
      <div className="space-y-8">
        {activities.map((act, i) => (
          <div key={act.id} className={i > 0 ? "pt-8 border-t border-border" : ""}>
            <h3 className="font-semibold text-foreground text-sm">{act.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{act.organization}</p>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed italic">"{act.description}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;
