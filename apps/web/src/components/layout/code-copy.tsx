"use client";
import { cn } from "@/lib/utils";
import {
  Check,
  Clipboard,
  Download,
  Eye,
  EyeOff,
  Settings2,
  Sparkles,
  Info,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { transformTsxToJsx } from "@/lib/tsx-to-jsx-transformer";

export type LanguageType =
  | "tsx"
  | "jsx"
  | "typescript"
  | "javascript"
  | "css"
  | "html"
  | "json";

interface CopyStats {
  totalCopies: number;
  lastCopiedAt: Date | null;
}

const JSXIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <path fill="#ffd600" d="M6,42V6h36v36H6z"></path>
    <path
      fill="#000001"
      d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"
    ></path>
  </svg>
);

const TSXIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <rect width="36" height="36" x="6" y="6" fill="#1976d2"></rect>
    <polygon
      fill="#fff"
      points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"
    ></polygon>
    <path
      fill="#fff"
      d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"
    ></path>
  </svg>
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <rect width="36" height="36" x="6" y="6" fill="#1976d2"></rect>
    <polygon
      fill="#fff"
      points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"
    ></polygon>
    <path
      fill="#fff"
      d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.920 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"
    ></path>
  </svg>
);

const JavaScriptIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <path fill="#ffd600" d="M6,42V6h36v36H6z"></path>
    <path
      fill="#000001"
      d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"
    ></path>
  </svg>
);

const CSSIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <path fill="#0277BD" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path>
    <path fill="#039BE5" d="M24,8v31.9l11.2-3.2L37.7,8H24z"></path>
    <path
      fill="#FFF"
      d="M33.1 13L24 13 24 17 28.9 17 28.6 21 24 21 24 25 28.4 25 28.1 29.5 24 30.9 24 35.1 31.9 32.5 32.6 21 32.6 21z"
    ></path>
    <path
      fill="#EEE"
      d="M24,13v4h-8.9l-0.3-4H24z M19.4,21l0.2,4H24v-4H19.4z M19.8,27h-4l0.3,5.5l7.9,2.6v-4.2l-4.1-1.4L19.8,27z"
    ></path>
  </svg>
);

const HTMLIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <path fill="#E65100" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path>
    <path fill="#FF6D00" d="M24,8v31.9l11.2-3.2L37.7,8H24z"></path>
    <path
      fill="#FFF"
      d="M24,25v-4h8.6l-0.7,11.5L24,35.1v-4.2l4.1-1.4l0.3-4.5H24z M32.9,17l0.3-4H24v4H32.9z"
    ></path>
    <path
      fill="#EEE"
      d="M24,30.9v4.2l-7.9-2.6L15.7,27h4l0.2,2.5L24,30.9z M19.1,17H24v-4h-9.1l0.7,12H24v-4h-4.6L19.1,17z"
    ></path>
  </svg>
);

const JSONIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <path fill="#FFD54F" d="M6,42V6h36v36H6z"></path>
    <path
      fill="#424242"
      d="M16.5,18l3.5,6l-3.5,6h-3l3.5-6L13.5,18H16.5z M31.5,18l3.5,6l-3.5,6h-3l3.5-6L28.5,18H31.5z"
    ></path>
  </svg>
);

const getLanguageIcon = (language: LanguageType, className?: string) => {
  switch (language) {
    case "tsx":
      return <TSXIcon className={className} />;
    case "jsx":
      return <JSXIcon className={className} />;
    case "typescript":
      return <TypeScriptIcon className={className} />;
    case "javascript":
      return <JavaScriptIcon className={className} />;
    case "css":
      return <CSSIcon className={className} />;
    case "html":
      return <HTMLIcon className={className} />;
    case "json":
      return <JSONIcon className={className} />;
    default:
      return <JSXIcon className={className} />;
  }
};

const getLanguageDisplayName = (language: LanguageType): string => {
  const names: Record<LanguageType, string> = {
    tsx: "React TS",
    jsx: "React JS",
    typescript: "TypeScript",
    javascript: "JavaScript",
    css: "CSS",
    html: "HTML",
    json: "JSON",
  };
  return names[language];
};

const getFileExtension = (language: LanguageType): string => {
  const extensions: Record<LanguageType, string> = {
    tsx: "tsx",
    jsx: "jsx",
    typescript: "ts",
    javascript: "js",
    css: "css",
    html: "html",
    json: "json",
  };
  return extensions[language];
};

interface CodeCopyProps {
  code: string;
  className?: string;
  selectedLanguage?: LanguageType;
  onLanguageChange?: (language: LanguageType) => void;
  fileName?: string;
  showDownload?: boolean;
  showPreview?: boolean;
  enableStats?: boolean;
  supportedLanguages?: LanguageType[];
  compact?: boolean;
  showTransformationIndicator?: boolean;
}

const CodeCopy = ({
  code,
  className,
  selectedLanguage = "tsx",
  onLanguageChange,
  fileName,
  showDownload = true,
  showPreview = false,
  enableStats = false,
  supportedLanguages = ["tsx", "jsx"],
  compact = false,
  showTransformationIndicator = true,
}: CodeCopyProps) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [transformedCode, setTransformedCode] = useState<string>(code);
  const [copyStats, setCopyStats] = useState<CopyStats>({
    totalCopies: 0,
    lastCopiedAt: null,
  });
  const [isTransforming, setIsTransforming] = useState(false);

  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const transformCode = async () => {
      setIsTransforming(true);
      try {
        if (selectedLanguage === "jsx" && supportedLanguages.includes("jsx")) {
          const transformed = await transformTsxToJsx(code);
          setTransformedCode(transformed);
        } else {
          setTransformedCode(code);
        }
      } catch (error) {
        console.warn("Code transformation failed:", error);
        setTransformedCode(code);
      } finally {
        setIsTransforming(false);
      }
    };

    transformCode();
  }, [code, selectedLanguage, supportedLanguages]);

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showSettings]);

  // Load stats from localStorage
  useEffect(() => {
    if (enableStats) {
      const savedStats = localStorage.getItem("codeCopyStats");
      if (savedStats) {
        try {
          const parsed = JSON.parse(savedStats);
          setCopyStats({
            totalCopies: parsed.totalCopies || 0,
            lastCopiedAt: parsed.lastCopiedAt
              ? new Date(parsed.lastCopiedAt)
              : null,
          });
        } catch (error) {
          console.warn("Failed to load copy stats:", error);
        }
      }
    }
  }, [enableStats]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(transformedCode);
      setCopied(true);

      if (enableStats) {
        const newStats = {
          totalCopies: copyStats.totalCopies + 1,
          lastCopiedAt: new Date(),
        };
        setCopyStats(newStats);
        localStorage.setItem(
          "codeCopyStats",
          JSON.stringify({
            totalCopies: newStats.totalCopies,
            lastCopiedAt: newStats.lastCopiedAt.toISOString(),
          }),
        );
      }

      // Announce to screen readers
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = `Code copied to clipboard`;
      document.body.appendChild(announcement);

      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = transformedCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([transformedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const extension = getFileExtension(selectedLanguage);
    const downloadFileName = fileName
      ? fileName.replace(/\.[^/.]+$/, `.${extension}`)
      : `code.${extension}`;

    const link = document.createElement("a");
    link.href = url;
    link.download = downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const getCodePreview = (code: string, maxLines: number = 3): string => {
    const lines = code.split("\n");
    if (lines.length <= maxLines) return code;
    return lines.slice(0, maxLines).join("\n") + "\n...";
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={copyCode}
          className={cn(
            "relative p-1.5 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-md",
            className,
          )}
          title={copied ? "Copied!" : "Copy code"}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          <div
            className={`absolute inset-0 transform transition-all duration-200 ${
              copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <Clipboard className="h-3.5 w-3.5" />
          </div>
          <div
            className={`absolute inset-0 transform transition-all duration-200 ${
              copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            <Check className="h-3.5 w-3.5 text-green-500" />
          </div>
        </button>
        {showDownload && (
          <button
            onClick={downloadCode}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-md"
            title="Download code"
            aria-label="Download code"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {/* Language Selector */}
      {supportedLanguages.length > 1 && (
        <div
          className="flex items-center bg-muted/50 rounded-md p-0.5 border border-muted-foreground/10"
          role="tablist"
          aria-label="Select code language"
        >
          {supportedLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange?.(lang)}
              className={cn(
                "px-2 py-1 text-xs font-medium rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background flex items-center gap-1",
                selectedLanguage === lang
                  ? "bg-white/10 text-foreground shadow-sm backdrop-blur-sm border border-white/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
              )}
              title={getLanguageDisplayName(lang)}
              role="tab"
              aria-selected={selectedLanguage === lang}
              aria-controls={`code-language-${lang}`}
              disabled={isTransforming}
            >
              {getLanguageIcon(lang, "h-3 w-3")}
              <span className="hidden sm:inline">
                {lang === "tsx"
                  ? "TS"
                  : lang === "jsx"
                    ? "JS"
                    : lang.slice(0, 3).toUpperCase()}
              </span>
            </button>
          ))}
          {isTransforming && showTransformationIndicator && (
            <div className="ml-1 flex items-center">
              <Sparkles className="h-3 w-3 animate-pulse text-blue-500" />
            </div>
          )}
        </div>
      )}

      {/* Preview Toggle */}
      {showPreview && (
        <button
          onClick={togglePreview}
          className={cn(
            "p-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md",
            previewMode && "text-blue-500 bg-blue-500/10",
          )}
          title={previewMode ? "Hide preview" : "Show preview"}
          aria-label={previewMode ? "Hide preview" : "Show preview"}
        >
          {previewMode ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      )}

      {/* Settings */}
      <div className="relative" ref={settingsRef}>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={cn(
            "p-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md",
            showSettings && "text-foreground bg-muted/50",
          )}
          title="Settings"
          aria-label="Settings"
          aria-expanded={showSettings}
        >
          <Settings2 className="h-4 w-4" />
        </button>

        {showSettings && (
          <div className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-md shadow-md p-2 z-50 min-w-[200px]">
            <div className="space-y-2">
              {enableStats && (
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-1 mb-1">
                    <Info className="h-3 w-3" />
                    <span className="font-medium">Copy Stats</span>
                  </div>
                  <div>Total copies: {copyStats.totalCopies}</div>
                  {copyStats.lastCopiedAt && (
                    <div>
                      Last copied: {copyStats.lastCopiedAt.toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                <div>Lines: {transformedCode.split("\n").length}</div>
                <div>Characters: {transformedCode.length}</div>
                <div>Size: {new Blob([transformedCode]).size} bytes</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Download Button */}
      {showDownload && (
        <button
          onClick={downloadCode}
          className={cn(
            "relative p-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md",
            className,
          )}
          title={`Download ${getLanguageDisplayName(selectedLanguage)} file`}
          aria-label={
            downloaded
              ? "Downloaded"
              : `Download ${getLanguageDisplayName(selectedLanguage)} file`
          }
        >
          <div
            className={`absolute inset-0 transform transition-all duration-300 ${
              downloaded ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <Download className="h-4 w-4" />
          </div>
          <div
            className={`absolute inset-0 transform transition-all duration-300 ${
              downloaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            <Check className="h-4 w-4 text-green-500" />
          </div>
        </button>
      )}

      {/* Copy Button */}
      <button
        onClick={copyCode}
        className={cn(
          "relative cursor-pointer z-20 p-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md",
          className,
        )}
        title={`Copy ${getLanguageDisplayName(selectedLanguage)} code`}
        aria-label={
          copied
            ? "Copied"
            : `Copy ${getLanguageDisplayName(selectedLanguage)} code`
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            copyCode();
          }
        }}
      >
        <div
          className={`absolute inset-0 transform transition-all duration-300 ${
            copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <Clipboard className="h-4 w-4" />
        </div>
        <div
          className={`absolute inset-0 transform transition-all duration-300 ${
            copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <Check className="h-4 w-4 text-green-500" />
        </div>
        {/* Screen-reader feedback for copied state */}
        <span className="sr-only" aria-live="polite">
          {copied
            ? "Copied"
            : `Copy ${getLanguageDisplayName(selectedLanguage)} code`}
        </span>
      </button>

      {/* Preview Panel */}
      {showPreview && previewMode && (
        <div className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-md shadow-md p-3 z-50 max-w-sm">
          <div className="text-xs font-medium text-foreground mb-2 flex items-center gap-2">
            {getLanguageIcon(selectedLanguage, "h-3 w-3")}
            {getLanguageDisplayName(selectedLanguage)} Preview
          </div>
          <pre className="text-xs text-muted-foreground font-mono bg-muted/30 p-2 rounded overflow-auto max-h-32">
            <code>{getCodePreview(transformedCode)}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeCopy;
