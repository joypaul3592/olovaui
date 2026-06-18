"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
}

export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  sizes = "(max-width: 768px) 100vw, 768px",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isExternal = src.startsWith("http");
  const makeKey = (s: string) => s.replace(/\.[^.]+$/, "").replace(/[\\/]/g, "_");
  const key = !isExternal && src.startsWith("/") ? makeKey(src) : null;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}

      {hasError ? (
        <div className="flex items-center justify-center h-full bg-secondary text-muted-foreground">
          Failed to load image
        </div>
      ) : (
        isExternal || !key ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={quality}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            className={cn(
              "transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        ) : (
          <picture>
            <source
              type="image/avif"
              srcSet={`/optimized/${key}-640.avif 640w, /optimized/${key}-1280.avif 1280w, /optimized/${key}-1920.avif 1920w`}
              sizes={sizes}
            />
            <source
              type="image/webp"
              srcSet={`/optimized/${key}-640.webp 640w, /optimized/${key}-1280.webp 1280w, /optimized/${key}-1920.webp 1920w`}
              sizes={sizes}
            />
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              quality={quality}
              priority={priority}
              placeholder={placeholder}
              blurDataURL={blurDataURL}
              className={cn(
                "transition-opacity duration-300",
                isLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          </picture>
        )
      )}
    </div>
  );
}
