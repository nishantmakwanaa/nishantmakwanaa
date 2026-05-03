import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FadeSection from "@/components/FadeSection";
import ContactSection from "@/components/ContactSection";
import { useProjects } from "@/hooks/usePortfolioData";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

const AllProjects = () => {
  const navigate = useNavigate();
  const { data: projectsData, isLoading: loading } = useProjects();
  const projects = projectsData || [];

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <main className="max-w-[722px] w-full mx-auto px-4 sm:px-6 pt-10 pb-6 sm:pb-10 flex-1 flex flex-col">
        <div className="pt-14 flex-1 flex flex-col">
          <div className="flex-1 flex flex-col">
            <FadeSection className="flex-1 flex flex-col">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> Home
              </button>
              <h1 className="text-2xl font-bold text-foreground mb-6">All Projects</h1>

              {loading ? (
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="rounded-xl border border-border overflow-hidden animate-pulse flex flex-col">
                      <div className="aspect-[5/4] bg-muted" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-muted rounded w-2/3" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : projects.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground font-medium min-h-[40vh]">
                  No projects found
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {projects.map((project: any) => (
                    <FadeSection key={project.id}>
                      <div
                        className="group rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
                        onClick={() => {
                          navigate(`/project/${project.slug}`, { state: { from: "projects" } });
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className="aspect-[5/4] overflow-hidden bg-muted relative">
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
                              <p className="font-semibold text-sm text-foreground">{project.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">{project.subtitle || "Website"}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                          </div>
                        </div>
                      </div>
                    </FadeSection>
                  ))}
                </div>
              )}
            </FadeSection>
          </div>

          <div className="mt-12 sm:mt-16">
            <FadeSection>
              <ContactSection />
            </FadeSection>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllProjects;
