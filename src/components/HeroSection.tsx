import type { ReactNode } from "react";
import { MapPin, Video, Mail } from "lucide-react";
import { useHeroInfo, useSocialLinks } from "@/hooks/usePortfolioData";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { User } from "lucide-react";
import { toast } from "sonner";

const iconMap: Record<string, ReactNode> = {
  youtube: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  instagram: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  leetcode: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>,
  codeforces: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"/></svg>,
  codechef: (
    <span className="w-5 h-5 inline-flex items-center justify-center text-[13px] font-bold leading-none text-foreground/80 tracking-tighter shrink-0 select-none">
      CC
    </span>
  ),
};

const HeroSection = () => {
  const { data: hero } = useHeroInfo();
  const { data: socials } = useSocialLinks("contact");

  const name = hero?.name || "Nishant Makwana";
  const role = hero?.role || "Software Engineer";
  const location = hero?.location || "Ahmedabad, India";
  const email = hero?.email || "nishantmakwanacreations@gmail.com";
  const scheduleLink = (hero?.schedule_link ?? "").trim();
  const profileImageUrl = hero?.profile_image_url || "";

  const normalize = (value: string) => value.trim().toLowerCase();
  const codingLinks = socials?.filter((s) => ["codechef", "codeforces", "leetcode"].includes(normalize(s.icon_name)));
  const rightSocialLinks = socials?.filter((s) => ["instagram", "youtube"].includes(normalize(s.icon_name)));

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard!");
  };

  return (
    <section id="intro" className="cv-section !pt-0" aria-label="Introduction">
      <div className="flex items-end justify-between gap-4 flex-wrap sm:flex-nowrap">
        <div className="flex flex-col items-center gap-4 w-full sm:flex-row sm:items-start sm:justify-start">
          <ImageWithFallback
            src={profileImageUrl}
            alt={`${name} - ${role}`}
            className="w-[100px] h-[100px] rounded-xl object-cover shrink-0"
            width={100}
            height={100}
            fallbackIcon={<User className="w-10 h-10 mb-2 opacity-20" />}
          />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-[26px] font-bold text-foreground tracking-[-0.02em] leading-tight">{name}</h1>
            <p className="text-[18px] text-muted-foreground leading-snug mt-0.5">{role}</p>
            <p className="text-[14px] text-muted-foreground flex items-center gap-1 mt-1 justify-center sm:justify-start">
              <MapPin className="w-3.5 h-3.5" /> {location}
            </p>
            <button
              onClick={handleCopyEmail}
              className="text-[14px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mt-1 cursor-pointer max-w-full justify-center sm:justify-start"
              title="Click to copy email"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" /> 
              <span className="truncate">{email}</span>
            </button>
          </div>
        </div>
              </div>

      <nav className="mt-6 pt-4 border-t border-border w-full" aria-label="Social links">
        <div className="flex items-center justify-around flex-wrap gap-4 max-sm:gap-3 w-full max-sm:px-6">
          {scheduleLink ? (
            <>
              <a
                href={scheduleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 shrink-0"
                aria-label="Schedule a meeting"
                title="Meet"
              >
                <Video className="w-5 h-5" />
                <span className="hidden sm:inline">Meet</span>
              </a>
              {codingLinks && codingLinks.length > 0 && (
                <span className="text-muted-foreground/30 select-none">|</span>
              )}
            </>
          ) : null}

          {codingLinks?.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 shrink-0"
            >
              {iconMap[normalize(link.icon_name)] || null}
              <span className="hidden sm:inline">{link.name}</span>
            </a>
          ))}
          
          {rightSocialLinks && rightSocialLinks.length > 0 && (
            <span className="text-muted-foreground/30 select-none">|</span>
          )}

          {rightSocialLinks?.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 shrink-0"
              aria-label={link.name}
              title={link.name}
            >
              {iconMap[normalize(link.icon_name)] || null}
              <span className="hidden sm:inline">{link.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </section>
  );
};

export default HeroSection;
