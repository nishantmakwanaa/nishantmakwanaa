import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const getTimeBasedTheme = () => {
  const hour = new Date().getHours();
  return hour < 6 || hour >= 18;
};

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(() => {
    // Only respect manual preference if set in this session
    const manuallySet = sessionStorage.getItem("theme-manual");
    if (manuallySet) {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
    }
    // Default: use time-based theme
    return getTimeBasedTheme();
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    sessionStorage.setItem("theme-manual", "true");
  };

  return (
    <button
      onClick={toggle}
      className={
        className ??
        cn(
          "fixed right-6 bottom-6 z-[999] w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity"
        )
      }
      aria-label="Toggle theme"
    >
      {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
