import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useArticleBySlug, useArticles } from "@/hooks/usePortfolioData";
import { getArticleImage } from "@/components/ArticlesSection";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import NotFound from "./NotFound";
import ContactSection from "@/components/ContactSection";
import FadeSection from "@/components/FadeSection";

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = (location.state as any)?.from || "";
  const { data: article, isLoading } = useArticleBySlug(slug);
  const { data: allArticles } = useArticles();
  const otherArticles = allArticles?.filter((a) => a.slug !== slug) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background transition-colors duration-300">
        <main className="max-w-[722px] mx-auto px-4 sm:px-6 py-10 min-h-screen">
          <div className="py-8 pt-16 animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-16" />
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="aspect-[16/9] bg-muted rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  if (!article) return <NotFound />;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="max-w-[722px] mx-auto px-4 sm:px-6 py-10 min-h-screen">
        <FadeSection>
          <div className="py-8 pt-16">
            <button
              onClick={() => {
                if (fromPage === "articles") navigate("/articles");
                else if (fromPage === "article") navigate(-1 as any);
                else navigate("/");
              }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> {fromPage === "articles" ? "All Articles" : fromPage === "article" ? "Previous Article" : "Home"}
            </button>

            <p className="text-xs text-muted-foreground mb-2">{article.date}</p>
            <h1 className="text-2xl font-bold text-foreground mb-4">{article.title}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{article.excerpt}</p>

            <div className="rounded-xl overflow-hidden border border-border mb-8">
              <ImageWithFallback src={getArticleImage(article.image_url)} alt={article.title} className="w-full aspect-[16/9] object-cover" />
            </div>

            <div className="space-y-6">
              {article.content.map((block, i) => {
                switch (block.type) {
                  case "heading":
                    return (
                      <h2 key={i} className="text-lg font-semibold text-foreground mt-8">
                        {block.text}
                      </h2>
                    );
                  case "text":
                    return (
                      <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                        {block.text}
                      </p>
                    );
                  case "image":
                    return (
                      <div key={i} className="rounded-xl overflow-hidden border border-border">
                        <ImageWithFallback
                          src={getArticleImage(block.src || block.image || null)}
                          alt={block.alt || ""}
                          className="w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    );
                  case "left_half_frame":
                    return (
                      <div key={i} className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-full sm:w-1/2 shrink-0 rounded-xl overflow-hidden border border-border">
                          <ImageWithFallback
                            src={getArticleImage(block.image || null)}
                            alt={block.alt || ""}
                            className="w-full aspect-[4/3] object-cover"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed w-full sm:w-1/2">
                          {block.text}
                        </p>
                      </div>
                    );
                  case "right_half_frame":
                    return (
                      <div key={i} className="flex flex-col sm:flex-row-reverse gap-4 items-start">
                        <div className="w-full sm:w-1/2 shrink-0 rounded-xl overflow-hidden border border-border">
                          <ImageWithFallback
                            src={getArticleImage(block.image || null)}
                            alt={block.alt || ""}
                            className="w-full aspect-[4/3] object-cover"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed w-full sm:w-1/2">
                          {block.text}
                        </p>
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        </FadeSection>

        {otherArticles.length > 0 && (
        <FadeSection>
          <div className="py-8 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title !mb-0">Read more articles</h2>
              <Link to="/articles" className="text-[14px] text-foreground hover-bold flex items-center gap-1 transition-all">
                View all <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-6">
              {otherArticles.map((a, i) => (
                <FadeSection key={a.id}>
                  <div
                    className={`cursor-pointer group ${i > 0 ? "pt-6 border-t border-border" : ""}`}
                    onClick={() => {
                      navigate(`/article/${a.slug}`, { state: { from: "article" } });
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-[50%] shrink-0 rounded-xl overflow-hidden border border-border">
                        <ImageWithFallback src={getArticleImage(a.image_url)} alt={a.title} className="w-full h-full object-cover aspect-[4/3]" />
                      </div>
                      <div className="w-full sm:w-[50%] min-w-0 flex flex-col">
                        <h3 className="font-semibold text-foreground text-[14px]">{a.title}</h3>
                        <p className="text-[13px] text-muted-foreground mt-0.5">{a.source}, {a.date}</p>
                        <p className="text-[14px] text-muted-foreground mt-2 leading-relaxed line-clamp-3">{a.excerpt}</p>
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
          </div>
        </FadeSection>
        )}

        <FadeSection><ContactSection /></FadeSection>
      </main>
    </div>
  );
};

export default ArticleDetail;
