import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackIcon?: React.ReactNode;
}

const ImageWithFallback = React.forwardRef<HTMLImageElement, ImageWithFallbackProps>(
  ({ src, alt, className, fallbackIcon, ...props }, ref) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!src) {
        setError(true);
        setLoading(false);
      } else {
        setError(false);
        setLoading(true);
      }
    }, [src]);

    if (error) {
      return (
        <div
          className={cn(
            "flex flex-col items-center justify-center bg-muted text-muted-foreground/30 p-6 text-center",
            className
          )}
        >
          {fallbackIcon || <ImageIcon className="w-10 h-10 mb-2 opacity-20" />}
          <span className="text-xs font-medium opacity-40 uppercase tracking-wider">No Image</span>
        </div>
      );
    }

    return (
      <div className={cn("relative overflow-hidden", className)}>
        {loading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          ref={ref}
          src={src as string}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            loading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          {...props}
        />
      </div>
    );
  }
);

ImageWithFallback.displayName = "ImageWithFallback";

export { ImageWithFallback };
