import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import FadeSection from "@/components/FadeSection";
import NotFound from "./NotFound";
import { useProjects } from "@/hooks/usePortfolioData";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

// Removed NotFoundPlaceholder in favor of ImageWithFallback

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = (location.state as any)?.from || "";
  
  const { data: projects, isLoading: loading } = useProjects();
  const project = projects?.find(p => p.slug === slug) || null;
  const otherProjects = projects?.filter(p => p.slug !== slug).slice(0, 4) || [];
  const notFound = !loading && !project;

  if (loading) {
    return (
      <div className="min-h-screen bg-background transition-colors duration-300">
        <main className="max-w-[722px] mx-auto px-4 sm:px-6 py-10 min-h-screen">
          <div className="py-8 pt-16 animate-pulse space-y-6">
            <div className="h-4 bg-muted rounded w-16" />
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="aspect-[16/10] bg-muted rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  if (notFound || !project) return <NotFound />;

  const mainImage = project.image_url || null;
  const year = project.created_at ? new Date(project.created_at).getFullYear().toString() : new Date().getFullYear().toString();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="max-w-[722px] mx-auto px-4 sm:px-6 py-10 min-h-screen">
        <FadeSection>
          <div className="py-8 pt-16">
            <button
              onClick={() => {
                if (fromPage === "projects") navigate("/projects");
                else if (fromPage === "project") navigate(-1 as any);
                else navigate("/");
              }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> {fromPage === "projects" ? "All Projects" : fromPage === "project" ? "Previous Project" : "Home"}
            </button>

            <h1 className="text-2xl font-bold text-foreground mb-1">{project.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <a href={project.live_url || project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors underline-fill">
                Visit Website <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {project.description && (
              <p className="text-sm text-muted-foreground leading-relaxed mt-6">{project.description}</p>
            )}

            <div className="mt-8">
              <div className="rounded-xl overflow-hidden border border-border relative">
                <ImageWithFallback
                  src={mainImage}
                  alt={`${project.title} screenshot`}
                  className="w-full aspect-[16/10] object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex items-center gap-0 mt-8 pt-6 border-t border-border">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="text-sm font-medium text-foreground mt-0.5">Website</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex-1 pl-4">
                <p className="text-xs text-muted-foreground">Services</p>
                <p className="text-sm font-medium text-foreground mt-0.5">Web Development</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex-1 pl-4">
                <p className="text-xs text-muted-foreground">Client</p>
                <p className="text-sm font-medium text-foreground mt-0.5">Personal</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex-1 pl-4">
                <p className="text-xs text-muted-foreground">Year</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{year}</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {otherProjects.length > 0 && (
        <FadeSection>
          <div className="py-8 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title !mb-0">View more projects</h2>
              <Link to="/projects" className="text-sm text-foreground hover:opacity-70 flex items-center gap-1 transition-opacity">
                View all <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherProjects.map((p) => (
                  <FadeSection key={p.slug}>
                    <div
                      className="group rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer aspect-square flex flex-col"
                      onClick={() => {
                        navigate(`/project/${p.slug}`, { state: { from: "project" } });
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className="flex-1 overflow-hidden bg-muted relative">
                        <ImageWithFallback
                          src={p.image_url}
                          alt={`${p.title} preview`}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-sm text-foreground">{p.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{p.subtitle || "Website"}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                        </div>
                      </div>
                    </div>
                  </FadeSection>
                ))}
              </div>
          </div>
        </FadeSection>
        )}

        <FadeSection><ContactSection /></FadeSection>
      </main>
    </div>
  );
};

export default ProjectDetail;
