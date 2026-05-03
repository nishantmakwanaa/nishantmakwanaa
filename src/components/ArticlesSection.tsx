import { ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useArticles } from "@/hooks/usePortfolioData";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

import blogHackople from "@/assets/blog-hackople.jpg";
import blogYogatech from "@/assets/blog-yogatech.jpg";
import blogSsip from "@/assets/blog-ssip.jpg";
import blogTechmanjari from "@/assets/blog-techmanjari.jpg";

// export const FALLBACK_IMAGE = "https://placehold.co/800x450/1a1a2e/aaaaaa?text=No+Image&font=inter";

const imageMap: Record<string, string> = {
  "/assets/blog-hackople.jpg": blogHackople,
  "/assets/blog-yogatech.jpg": blogYogatech,
  "/assets/blog-ssip.jpg": blogSsip,
  "/assets/blog-techmanjari.jpg": blogTechmanjari,
};

export function getArticleImage(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  // Known local assets
  if (imageMap[imageUrl]) return imageMap[imageUrl];
  // External URLs (http/https)
  if (imageUrl.startsWith("http")) return imageUrl;
  // Local paths from data/images/ folder (served from public)
  if (imageUrl.startsWith("/data/")) return imageUrl;
  return imageUrl;
}

/** @deprecated Use ImageWithFallback component instead */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  // Now handled by ImageWithFallback
}

const ArticlesSection = () => {
  const navigate = useNavigate();
  const { data: articles, isLoading } = useArticles();

  if (isLoading || !articles) {
    return (
      <div id="blog" className="cv-section">
        <h2 className="section-title">Articles & publications</h2>
        <div className="space-y-6 animate-pulse">
          {[1, 2, 3].map((i) => (
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
      </div>
    );
  }

  // Shuffle and pick 3 random articles
  const shuffled = [...articles].sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <div id="blog" className="cv-section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title !mb-0">Articles & publications</h2>
        <Link to="/articles" className="text-[14px] text-foreground hover-bold flex items-center gap-1 transition-all">
          View all <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="space-y-6">
        {shuffled.map((article, i) => (
          <div
            key={article.id}
            className={`cursor-pointer group ${i > 0 ? "pt-6 border-t border-border" : ""}`}
            onClick={() => {
              if (article.url) {
                window.open(article.url, "_blank");
              } else {
                navigate(`/article/${article.slug}`, { state: { from: "home" } });
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
                <p className="text-[14px] text-muted-foreground mt-0.5">
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
        ))}
      </div>
    </div>
  );
};

export default ArticlesSection;
