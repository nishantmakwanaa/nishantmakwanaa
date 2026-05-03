import { ReactNode } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";

import { cn } from "@/lib/utils";

const FadeSection = ({ children, className }: { children: ReactNode; className?: string }) => {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={cn("fade-section", className)}>
      {children}
    </div>
  );
};

export default FadeSection;
