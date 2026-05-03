import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/usePortfolioData";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

function formatRepoName(name: string): string {
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getScreenshotUrl(homepageUrl: string): string {
  return `https://api.microlink.io/?url=${encodeURIComponent(homepageUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
}

export interface ProjectData {
  title: string;
  subtitle: string;
  image: string;
  slug: string;
  url?: string;
  homepage?: string | null;
  description?: string | null;
  language?: string | null;
}

const ProjectCard = ({ project }: { project: any }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.slug}`, { state: { from: "home" } });
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="group rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer aspect-square flex flex-col"
      onClick={handleClick}
    >
      <div className="flex-1 overflow-hidden bg-muted relative">
        <ImageWithFallback
          src={project.image_url}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-[15px] text-foreground">{project.title}</p>
            <p className="text-[14px] text-muted-foreground line-clamp-1">{project.subtitle || "Website"}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const { data: projectsData, isLoading: loading } = useProjects();
  const pinnedProjects = projectsData ? projectsData.slice(0, 4) : [];

  return (
    <div id="projects" className="cv-section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title !mb-0">Some of my work</h2>
        <Link to="/projects" className="text-[14px] text-foreground hover-bold flex items-center gap-1 transition-all">
          View all <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden animate-pulse aspect-square flex flex-col">
              <div className="flex-1 bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-2/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        pinnedProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pinnedProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border p-6 text-center text-muted-foreground">
            No projects available
          </div>
        )
      )}
    </div>
  );
};

export { getScreenshotUrl };
export default ProjectsSection;
