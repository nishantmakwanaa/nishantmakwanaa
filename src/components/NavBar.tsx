import type { ReactNode } from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { BookOpenText, FileText, FolderKanban, House } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useHeroInfo, useSocialLinks, useProjects, useArticles, useResumeInfo } from "@/hooks/usePortfolioData";
import { hasProjects as hasProjectsStatic } from "@/lib/projects";
import ThemeToggle from "@/components/ThemeToggle";

const iconMap: Record<string, ReactNode> = {
  linkedin: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  x: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  leetcode: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  ),
  codeforces: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
    </svg>
  ),
  codechef: (
    <span className="w-5 h-5 inline-flex items-center justify-center text-[0.4rem] font-bold leading-none text-foreground fill-current shrink-0 select-none">
      CC
    </span>
  ),
};

/** Keys used for nav buttons that can be "active" */
type NavKey = "home" | "projects" | "articles" | "resume";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: hero } = useHeroInfo();
  const { data: socialLinks } = useSocialLinks("hero");
  const { data: projects } = useProjects();
  const { data: articles, isPending: isArticlesPending } = useArticles();
  const { data: resumeInfo, isPending: isResumePending } = useResumeInfo();
  const hasProjects = hasProjectsStatic || (projects && projects.length > 0);
  const hasArticles = isArticlesPending || (articles?.length ?? 0) > 0;
  const hasResume = isResumePending || !!resumeInfo?.url;

  const normalize = (value: string) => value.trim().toLowerCase();
  const codingItems = socialLinks?.filter((l) => ["github", "linkedin", "twitter", "x"].includes(normalize(l.icon_name)));

  const goHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<NavKey, HTMLButtonElement | null>>({ home: null, projects: null, articles: null, resume: null });

  const activeKey: NavKey | null = location.pathname === "/"
    ? "home"
    : location.pathname.startsWith("/projects") || location.pathname.startsWith("/project/")
      ? "projects"
      : location.pathname.startsWith("/articles") || location.pathname.startsWith("/article/")
        ? "articles"
        : location.pathname === "/resume"
          ? "resume"
          : null;

  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const measureIndicator = useCallback(() => {
    if (!activeKey || !containerRef.current || !btnRefs.current[activeKey]) {
      setIndicator(null);
      return;
    }
    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = btnRefs.current[activeKey]!.getBoundingClientRect();
    setIndicator({
      left: btnRect.left - containerRect.left + containerRef.current.scrollLeft,
      width: btnRect.width,
    });
  }, [activeKey]);

  useEffect(() => {
    measureIndicator();
  }, [measureIndicator, hasProjects, hasArticles, hasResume]);

  useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

   const baseBtn = "relative z-10 w-9 h-9 rounded-md flex items-center justify-center transition-colors duration-200 shrink-0";
  const inactiveBtn = `${baseBtn} text-foreground hover:bg-foreground/10 active:scale-95`;
  const activeBtn = `${baseBtn} text-white dark:text-black`;
   const defaultStyle = "w-9 h-9 rounded-md flex items-center justify-center text-foreground hover:bg-foreground/10 transition-all duration-150 shrink-0 active:scale-95";

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] w-fit max-w-[calc(100%-1rem)]">
      <div
        ref={containerRef}
        className="relative flex items-center justify-start sm:justify-center gap-1.5 sm:gap-4 bg-muted/90 backdrop-blur-md rounded-md shadow-sm px-1.5 sm:px-3 py-1.5 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Sliding active indicator */}
        {indicator && (
          <div
            className="absolute top-1/2 -translate-y-1/2 rounded-md bg-black dark:bg-white transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] pointer-events-none z-0"
            style={{
              left: indicator.left,
              width: indicator.width,
              height: 'calc(100% - 12px)',
            }}
          />
        )}

        <button
          ref={(el) => { btnRefs.current.home = el; }}
          onClick={goHome}
          className={activeKey === "home" ? activeBtn : inactiveBtn}
          aria-label="Go to home"
          title="Home"
        >
          <House className="w-5 h-5" />
        </button>

        {hasProjects && (
          <button
            ref={(el) => { btnRefs.current.projects = el; }}
            onClick={() => navigate("/projects")}
            className={activeKey === "projects" ? activeBtn : inactiveBtn}
            aria-label="Open all projects"
            title="Projects"
          >
            <FolderKanban className="w-5 h-5" />
          </button>
        )}

        {hasArticles && (
          <button
            ref={(el) => { btnRefs.current.articles = el; }}
            onClick={() => navigate("/articles")}
            className={activeKey === "articles" ? activeBtn : inactiveBtn}
            aria-label="Open all articles"
            title="Articles"
          >
            <BookOpenText className="w-5 h-5" />
          </button>
        )}

        {hasResume && (
          <button
            ref={(el) => { btnRefs.current.resume = el; }}
            onClick={() => navigate("/resume")}
            className={activeKey === "resume" ? activeBtn : inactiveBtn}
            aria-label="View resume"
            title="Resume"
          >
            <FileText className="w-5 h-5" />
          </button>
        )}

        <ThemeToggle className={`${defaultStyle} bg-transparent shadow-none`} />

        <span className="text-muted-foreground/40 px-0.5 select-none text-sm">|</span>

        {codingItems?.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={defaultStyle}
            aria-label={link.name}
            title={link.name}
          >
            {iconMap[normalize(link.icon_name)] || null}
          </a>
        ))}

      </div>
    </div>
  );
};

export default NavBar;
