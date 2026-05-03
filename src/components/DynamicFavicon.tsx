import { useEffect } from "react";
import { useHeroInfo } from "@/hooks/usePortfolioData";

const DynamicFavicon = () => {
  const { data: hero } = useHeroInfo();

  useEffect(() => {
    if (hero?.name) {
      document.title = `${hero.name} | ${hero.role || "Portfolio"}`;
    }

    if (!hero?.profile_image_url) return;

    // Remove existing favicon links
    const existing = document.querySelectorAll("link[rel='icon'], link[rel='apple-touch-icon']");
    existing.forEach((el) => el.remove());

    // Add new favicon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = hero.profile_image_url;
    document.head.appendChild(link);

    const apple = document.createElement("link");
    apple.rel = "apple-touch-icon";
    apple.href = hero.profile_image_url;
    document.head.appendChild(apple);
  }, [hero?.profile_image_url, hero?.name, hero?.role]);

  return null;
};

export default DynamicFavicon;
