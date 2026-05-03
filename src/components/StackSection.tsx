import { useStack } from "@/hooks/usePortfolioData";

const StackSection = () => {
  const { data: stack, isPending, isError } = useStack();

  if (isPending) {
    return (
      <div id="skills" className="cv-section">
        <h2 className="section-title">Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border animate-pulse">
              <div className="w-8 h-8 bg-muted rounded" />
              <div className="space-y-1">
                <div className="h-3 bg-muted rounded w-20" />
                <div className="h-2 bg-muted rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div id="skills" className="cv-section">
        <h2 className="section-title">Stack</h2>
        <p className="text-sm text-destructive">Could not load stack.</p>
      </div>
    );
  }

  if (!stack?.length) {
    return null;
  }

  return (
    <div id="skills" className="cv-section">
      <h2 className="section-title">Stack</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stack.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-border">
            <img src={item.icon_url} alt={item.title} className="w-8 h-8" loading="lazy" />
            <div>
              <p className="font-semibold text-sm text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackSection;
