import { useState, useEffect, lazy, Suspense } from "react";
import { RefreshCw } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NavBar from "./components/NavBar";

import DynamicFavicon from "./components/DynamicFavicon";

const ComingSoon = lazy(() => import("./pages/coming-soon/ComingSoon"));

const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const AllProjects = lazy(() => import("./pages/AllProjects"));
const AllArticles = lazy(() => import("./pages/AllArticles"));
const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  // Apply theme immediately so loading screen respects dark mode
  useEffect(() => {
    const manuallySet = sessionStorage.getItem("theme-manual");
    let shouldBeDark: boolean;
    if (manuallySet) {
      const saved = localStorage.getItem("theme");
      shouldBeDark = saved ? saved === "dark" : false;
    } else {
      const hour = new Date().getHours();
      shouldBeDark = hour < 6 || hour >= 18;
    }
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    // Minimal loading delay for smooth entrance
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <DynamicFavicon />
        {loading && (
          <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
            <RefreshCw className="w-7 h-7 text-foreground animate-spin" />
          </div>
        )}
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          {!loading && <NavBar />}
          <div
            className={`transition-all duration-400 ${loading ? "blur-sm opacity-0" : "blur-0 opacity-100"}`}
          >
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/projects" element={<AllProjects />} />
                <Route path="/articles" element={<AllArticles />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
                <Route path="/article/:slug" element={<ArticleDetail />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
