import { MapPin } from "lucide-react";
import { useEducation, useActivities } from "@/hooks/usePortfolioData";

const EducationSection = () => {
  const { data: education, isPending: pendingEdu, isError: errEdu } = useEducation();
  const { data: activities, isPending: pendingAct, isError: errAct } = useActivities();

  if (pendingEdu || pendingAct) {
    return (
      <div id="education" className="cv-section">
        <h2 className="section-title">Education</h2>
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-5 bg-muted rounded w-2/3" />
          <div className="h-4 bg-muted rounded w-full" />
        </div>
      </div>
    );
  }

  if (errEdu || errAct) {
    return (
      <div id="education" className="cv-section">
        <h2 className="section-title">Education</h2>
        <p className="text-sm text-destructive">Could not load education.</p>
      </div>
    );
  }

  if (!education?.length) {
    return null;
  }

  return (
    <div id="education" className="cv-section">
      <h2 className="section-title">Education</h2>
      <div className="space-y-0">
        {education.map((edu) => (
          <div key={edu.id} className="flex gap-4">
            <div className="flex flex-col items-center pt-1.5">
              <div className="w-2 h-2 rounded-full bg-foreground/30 shrink-0" />
              <div className="w-px flex-1 bg-border" />
            </div>
            <div className="pb-4">
              <p className="text-[14px] text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {edu.location}
              </p>
              <div className="flex items-center justify-between mt-1">
                <h3 className="font-semibold text-foreground text-[16px]">{edu.degree}</h3>
                <p className="text-[14px] text-muted-foreground shrink-0 ml-4">{edu.period}</p>
              </div>
              <p className="text-[15px] text-muted-foreground">{edu.school}</p>
              {edu.description && (
                <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">{edu.description}</p>
              )}
              {activities && activities.length > 0 && (
                <div className="mt-5">
                  <p className="text-[14px] font-semibold text-foreground mb-3">Activities & Leadership</p>
                  <div className="space-y-3">
                    {activities.map((act) => (
                      <div key={act.id}>
                        <p className="text-[14px] font-medium text-foreground">{act.name}</p>
                        <p className="text-[14px] text-muted-foreground leading-relaxed">{act.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
