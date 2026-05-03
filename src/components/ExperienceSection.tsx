import { MapPin } from "lucide-react";
import { useExperience } from "@/hooks/usePortfolioData";

const ExperienceSection = () => {
  const { data: experiences, isPending, isError } = useExperience();

  if (isPending) {
    return (
      <div id="experience" className="cv-section">
        <h2 className="section-title">Experience</h2>
        <div className="space-y-6 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-5 bg-muted rounded w-2/3" />
              <div className="h-4 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div id="experience" className="cv-section">
        <h2 className="section-title">Experience</h2>
        <p className="text-sm text-destructive">Could not load experience.</p>
      </div>
    );
  }

  if (!experiences?.length) {
    return null;
  }

  return (
    <div id="experience" className="cv-section">
      <h2 className="section-title">Experience</h2>
      <div className="space-y-0">
        {experiences.map((exp, i) => (
          <div key={exp.id} className="flex gap-4">
            <div className="flex flex-col items-center pt-1.5">
              <div className="w-2 h-2 rounded-full bg-foreground/30 shrink-0" />
              <div className="w-px flex-1 bg-border" />
            </div>
            <div className={`pb-8 ${i === experiences.length - 1 ? "pb-0" : ""}`}>
              <p className="text-[14px] text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {exp.location}
              </p>
              <div className="flex items-center justify-between mt-1">
                <h3 className="font-semibold text-foreground text-[16px]">{exp.company}</h3>
                <p className="text-[14px] text-muted-foreground shrink-0 ml-4">{exp.period}</p>
              </div>
              <p className="text-[15px] text-foreground font-medium mt-1 mb-2">{exp.role}</p>
              <ul className="space-y-1.5">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-[15px] text-muted-foreground leading-relaxed flex gap-2">
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
