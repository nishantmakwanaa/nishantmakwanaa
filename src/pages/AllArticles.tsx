import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useArticles } from "@/hooks/usePortfolioData";
import { getArticleImage } from "@/components/ArticlesSection";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import FadeSection from "@/components/FadeSection";
import ContactSection from "@/components/ContactSection";

const AllArticles = () => {
  const navigate = useNavigate();
  const { data: articles, isLoading } = useArticles();
  const articleList = [...(articles || [])].sort((a, b) => (a.title || "").localeCompare(b.title || ""));

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
              <h1 className="text-2xl font-bold text-foreground mb-6">All Articles</h1>

              {isLoading ? (
                <div className="space-y-6 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-1/2 aspect-[4/3] bg-muted rounded-xl" />
                      <div className="w-1/2 space-y-2">
                        <div className="h-4 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                        <div className="h-3 bg-muted rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : articleList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground font-medium min-h-[40vh]">
                  No articles found
                </div>
              ) : (
                <div className="space-y-6">
                  {articleList.map((article, i) => (
                    <FadeSection key={article.id}>
                      <div
                        className={`cursor-pointer group ${i > 0 ? "pt-6 border-t border-border" : ""}`}
                        onClick={() => {
                          if (article.url) {
                            window.open(article.url, "_blank");
                          } else {
                            navigate(`/article/${article.slug}`, { state: { from: "articles" } });
                            window.scrollTo(0, 0);
                          }
                        }}
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full sm:w-[50%] shrink-0 rounded-xl overflow-hidden border border-border">
                            <ImageWithFallback
                              src={getArticleImage(article.image_url)}
                              alt={article.title}
                              className="w-full h-full object-cover aspect-[4/3]"
                            />
                          </div>
                          <div className="w-full sm:w-[50%] min-w-0 flex flex-col">
                            <h3 className="font-semibold text-foreground text-[14px] group-hover:opacity-80 transition-opacity">
                              {article.title}
                            </h3>
                            <p className="text-[13px] text-muted-foreground mt-0.5">
                              {article.source}, {article.date}
                            </p>
                            <p className="text-[14px] text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                              {article.excerpt}
                            </p>
                            <div className="flex-1" />
                            <button className="text-[14px] text-foreground mt-3 flex items-center gap-1 transition-all underline-fill ml-auto">
                              Read article <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
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

export default AllArticles;
