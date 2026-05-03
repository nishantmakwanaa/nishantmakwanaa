import { useAbout } from "@/hooks/usePortfolioData";

const AboutSection = () => {
  const { data: paragraphs, isPending, isError } = useAbout();

  if (isPending) {
    return (
      <section id="about" className="cv-section" aria-label="About me">
        <h2 className="section-title">About me</h2>
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-4/6" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section id="about" className="cv-section" aria-label="About me">
        <h2 className="section-title">About me</h2>
        <p className="text-sm text-destructive">Could not load about content.</p>
      </section>
    );
  }

  return (
    <section id="about" className="cv-section" aria-label="About me">
      <h2 className="section-title">About me</h2>
      <div className="text-[16px] text-muted-foreground leading-relaxed space-y-4">
        {paragraphs?.map((p) => (
          <p key={p.id}>{p.content}</p>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
