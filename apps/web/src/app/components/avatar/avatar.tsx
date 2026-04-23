"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg" | "xl";

type AvatarContextValue = {
  size: AvatarSize;
  imageLoaded: boolean;
  imageError: boolean;
  setImageLoaded: (value: boolean) => void;
  setImageError: (value: boolean) => void;
};

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

function useAvatarContext() {
  const context = React.useContext(AvatarContext);
  if (!context) {
    throw new Error("Avatar components must be used within <Avatar>.");
  }
  return context;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-16",
};

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
}

export function Avatar({ size = "md", className, ...props }: AvatarProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  return (
    <AvatarContext.Provider
      value={{
        size,
        imageLoaded,
        imageError,
        setImageLoaded,
        setImageError,
      }}
    >
      <div
        data-slot="avatar"
        className={cn(
          "relative inline-flex shrink-0 overflow-hidden rounded-full border border-border bg-muted",
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    </AvatarContext.Provider>
  );
}

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function AvatarImage({ className, src, alt, ...props }: AvatarImageProps) {
  const { setImageLoaded, setImageError } = useAvatarContext();

  React.useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [src, setImageLoaded, setImageError]);

  if (!src) {
    return null;
  }

  return (
    <img
      data-slot="avatar-image"
      src={src}
      alt={alt ?? ""}
      className={cn("h-full w-full object-cover", className)}
      onLoad={(event) => {
        props.onLoad?.(event);
        setImageLoaded(true);
        setImageError(false);
      }}
      onError={(event) => {
        props.onError?.(event);
        setImageLoaded(false);
        setImageError(true);
      }}
      {...props}
    />
  );
}

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  const { imageLoaded, imageError } = useAvatarContext();

  if (imageLoaded && !imageError) {
    return null;
  }

  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        "absolute inset-0 flex items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  );
}
