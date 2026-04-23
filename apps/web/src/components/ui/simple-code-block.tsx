"use client";

import { useState, useEffect, isValidElement, ReactElement } from "react";
import { Check, Copy, WrapText, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { codeToHtml } from "shiki";
import { ReactIcon } from "@/assets/icons/react";
import { TypeScriptIcon } from "@/assets/icons/typescript";
import { JSXIcon } from "@/assets/icons/jsx";
import { JavaScriptIcon } from "@/assets/icons/javascript";

interface SimpleCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Type for React element with props
interface CodeElementProps {
  className?: string;
  children?: React.ReactNode;
}

// Parse metadata from className (e.g., language-js:filename.js#L10-20)
interface CodeMetadata {
  language: string;
  title?: string;
  startLine: number;
  isDiff: boolean;
}

// Function to get the appropriate icon for each language
const getLanguageIcon = (language: string) => {
  const iconProps = { className: "w-4 h-4 mr-2" };

  switch (language.toLowerCase()) {
    case "tsx":
    case "react":
      return <ReactIcon {...iconProps} />;
    case "jsx":
      return <JSXIcon {...iconProps} />;
    case "typescript":
    case "ts":
      return <TypeScriptIcon {...iconProps} />;
    case "javascript":
    case "js":
      return <JavaScriptIcon {...iconProps} />;
    default:
      return null;
  }
};

// Normalize language names for better detection
const normalizeLanguage = (lang: string): string => {
  const normalized = lang.toLowerCase().trim();

  const aliases: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    sh: "bash",
    shell: "bash",
    zsh: "bash",
    fish: "bash",
    powershell: "powershell",
    ps1: "powershell",
    cmd: "batch",
    bat: "batch",
    yml: "yaml",
    md: "markdown",
    mdx: "markdown",
    rb: "ruby",
    rs: "rust",
    kt: "kotlin",
    cs: "csharp",
    cpp: "cpp",
    "c++": "cpp",
    cxx: "cpp",
    cc: "cpp",
    hpp: "cpp",
    hxx: "cpp",
    h: "c",
    php: "php",
    go: "go",
    java: "java",
    scala: "scala",
    swift: "swift",
    dart: "dart",
    sql: "sql",
    mysql: "sql",
    postgresql: "sql",
    sqlite: "sql",
    toml: "toml",
    xml: "xml",
    html: "html",
    htm: "html",
    css: "css",
    scss: "scss",
    sass: "sass",
    less: "less",
    stylus: "stylus",
    json: "json",
    jsonc: "jsonc",
    json5: "json5",
    vue: "vue",
    svelte: "svelte",
    astro: "astro",
    dockerfile: "dockerfile",
    docker: "dockerfile",
    makefile: "makefile",
    make: "makefile",
    nginx: "nginx",
    apache: "apache",
    ini: "ini",
    cfg: "ini",
    conf: "ini",
    env: "dotenv",
    gitignore: "gitignore",
    ignore: "gitignore",
    diff: "diff",
    patch: "diff",
    log: "log",
    txt: "text",
    text: "text",
    plain: "text",
  };

  return aliases[normalized] || normalized;
};

// Parse metadata from className
const parseCodeMetadata = (className?: string): CodeMetadata => {
  let language = "text";
  let title: string | undefined;
  let startLine = 1;
  let isDiff = false;

  if (className) {
    // Match pattern: language-xxx:filename.js#L10-20
    const match = className.match(/language-(\w+)/);
    if (match) {
      const fullMatch = match[0];
      const langName = match[1];
      language = normalizeLanguage(langName);
      isDiff = language === "diff";

      // Extract everything after language-xxx
      const rest = className.substring(
        className.indexOf(fullMatch) + fullMatch.length,
      );

      // Extract title :filename.js
      const titleMatch = rest.match(/:([^#{\s]+)/);
      if (titleMatch) {
        title = titleMatch[1];
      }

      // Extract line range #L10-20
      const rangeMatch = rest.match(/#L(\d+)(?:-(\d+))?/);
      if (rangeMatch) {
        startLine = parseInt(rangeMatch[1]);
      }
    }
  }

  return { language, title, startLine, isDiff };
};

export function SimpleCodeBlock({
  children,
  className,
  ...props
}: SimpleCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [rawCode, setRawCode] = useState<string>("");
  const [metadata, setMetadata] = useState<CodeMetadata>({
    language: "text",
    startLine: 1,
    isDiff: false,
  });
  const [lineCount, setLineCount] = useState<number>(0);
  const [wordWrap, setWordWrap] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_LINES_BEFORE_COLLAPSE = 15;
  const showCollapseButton = lineCount > MAX_LINES_BEFORE_COLLAPSE;
  const remainingLines = lineCount - MAX_LINES_BEFORE_COLLAPSE;

  // Extract code and language from children
  useEffect(() => {
    let code = "";
    let meta: CodeMetadata = {
      language: "text",
      startLine: 1,
      isDiff: false,
    };

    if (isValidElement(children) && children.props) {
      const codeElement = children as ReactElement<CodeElementProps>;

      // Parse metadata from className
      if (codeElement.props.className) {
        meta = parseCodeMetadata(codeElement.props.className);
      }

      // Extract text content
      if (typeof codeElement.props.children === "string") {
        code = codeElement.props.children;
      } else if (codeElement.props.children) {
        // Handle nested text nodes
        const extractText = (node: React.ReactNode): string => {
          if (typeof node === "string") return node;
          if (Array.isArray(node)) return node.map(extractText).join("");
          if (
            isValidElement(node) &&
            node.props &&
            typeof node.props === "object" &&
            "children" in node.props
          ) {
            return extractText(
              (node.props as { children: React.ReactNode }).children,
            );
          }
          return "";
        };
        code = extractText(codeElement.props.children);
      }
    } else if (typeof children === "string") {
      code = children;
    }

    const trimmedCode = code.trim();
    setRawCode(trimmedCode);
    setMetadata(meta);
    setLineCount(trimmedCode.split("\n").length);
  }, [children]);

  // Generate highlighted HTML
  useEffect(() => {
    if (!rawCode) {
      setIsLoading(false);
      return;
    }

    const highlightCode = async () => {
      try {
        setIsLoading(true);

        const langToUse = metadata.language;

        const html = await codeToHtml(rawCode, {
          lang: langToUse,
          themes: {
            light: "github-light",
            dark: "github-dark-default",
          },
          defaultColor: false,
          transformers: [
            {
              name: "code-block-features",
              pre(node) {
                delete node.properties.style;
              },
              line(node, line) {
                const actualLineNumber = line + metadata.startLine - 1;
                node.properties["data-line"] = actualLineNumber.toString();

                // Handle diff lines
                if (metadata.isDiff) {
                  const codeContent = node.children
                    .map(
                      (child: {
                        type: string;
                        value?: string;
                        children?: { type: string; value?: string }[];
                      }) =>
                        child.type === "element"
                          ? child.children
                              ?.map((c: { type: string; value?: string }) =>
                                c.type === "text" ? c.value : "",
                              )
                              .join("") || ""
                          : child.type === "text"
                            ? child.value
                            : "",
                    )
                    .join("");

                  if (codeContent.startsWith("+")) {
                    this.addClassToHast(node, "diff-add");
                  } else if (codeContent.startsWith("-")) {
                    this.addClassToHast(node, "diff-remove");
                  }
                }
              },
            },
          ],
        });

        setHighlightedHtml(html);
      } catch (error) {
        console.warn(
          `Failed to highlight code for language: ${metadata.language}`,
          error,
        );

        try {
          const fallbackHtml = await codeToHtml(rawCode, {
            lang: "text",
            themes: {
              light: "github-light",
              dark: "github-dark-default",
            },
            defaultColor: false,
            transformers: [
              {
                name: "code-block-features",
                pre(node) {
                  delete node.properties.style;
                },
                line(node, line) {
                  const actualLineNumber = line + metadata.startLine - 1;
                  node.properties["data-line"] = actualLineNumber.toString();
                },
              },
            ],
          });
          setHighlightedHtml(fallbackHtml);
        } catch (fallbackError) {
          console.error(
            "Failed to highlight even with text fallback:",
            fallbackError,
          );
          setHighlightedHtml(
            `<pre class="shiki"><code>${rawCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`,
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    highlightCode();
  }, [rawCode, metadata]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleWordWrap = () => {
    setWordWrap(!wordWrap);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading || !highlightedHtml) {
    return (
      <div className="relative group my-8">
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border border-b-0 border-border rounded-t-lg">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 bg-muted animate-pulse rounded"></div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
              Loading...
            </span>
          </div>
        </div>
        <div className="border border-border bg-muted p-4 rounded-t-none rounded-b-lg">
          <div className="h-20 bg-muted-foreground/20 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  const hasHeader =
    metadata.title || (metadata.language && metadata.language !== "text");
  const displayLanguage = metadata.isDiff ? "diff" : metadata.language;

  return (
    <div className="relative group my-8" suppressHydrationWarning>
      {/* Header with title and language */}
      {hasHeader && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border border-b-0 border-border rounded-t-lg">
          <div className="flex items-center min-w-0 flex-1">
            {!metadata.title && getLanguageIcon(displayLanguage)}
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide truncate">
              {metadata.title || displayLanguage}
            </span>
          </div>
          <div className="flex items-center gap-1 ml-2">
            {/* Word Wrap Toggle */}
            <button
              onClick={toggleWordWrap}
              className={cn(
                "p-1.5 rounded-md transition-all duration-200",
                "hover:bg-muted/80",
                wordWrap && "bg-primary/10 text-primary",
              )}
              aria-label="Toggle word wrap"
              title="Toggle word wrap"
            >
              <WrapText className="h-3.5 w-3.5" />
            </button>
            {/* Expand/Collapse Toggle */}
            {showCollapseButton && (
              <button
                onClick={toggleExpanded}
                className={cn(
                  "p-1.5 rounded-md transition-all duration-200",
                  "hover:bg-muted/80",
                )}
                aria-label={isExpanded ? "Collapse code" : "Expand code"}
                title={isExpanded ? "Collapse code" : "Expand code"}
              >
                {isExpanded ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Code Block */}
      <div
        className={cn(
          "relative overflow-hidden border border-border",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border",
          // Remove background colors to let Shiki handle them
          "[&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-4 [&_pre]:!pl-[4.5rem]",
          "[&_code]:!bg-transparent [&_code]:!p-0",
          // Ensure proper text sizing and font
          "[&_pre]:text-sm [&_pre]:font-mono",
          "[&_code]:text-sm [&_code]:font-mono",
          // Handle scrolling vs wrapping
          wordWrap
            ? "[&_pre]:whitespace-pre-wrap [&_pre]:break-all"
            : "[&_pre]:overflow-x-auto",
          // Line numbers styling
          "[&_code]:grid",
          "[&_.line]:border-l [&_.line]:border-border/40 [&_.line]:pl-4",
          "[&_.line]:before:content-[attr(data-line)] [&_.line]:before:inline-block",
          "[&_.line]:before:w-8 [&_.line]:before:mr-4 [&_.line]:before:text-right",
          "[&_.line]:before:text-muted-foreground/60 [&_.line]:before:-ml-[4.5rem]",
          "[&_.line]:before:select-none [&_.line]:before:font-mono [&_.line]:before:text-xs",
          // Diff styling
          "[&_.line.diff-add]:bg-green-500/10 [&_.line.diff-add]:border-l-2 [&_.line.diff-add]:border-l-green-500",
          "[&_.line.diff-remove]:bg-red-500/10 [&_.line.diff-remove]:border-l-2 [&_.line.diff-remove]:border-l-red-500",
          "[&_.line.diff-add]:before:text-green-600 [&_.line.diff-remove]:before:text-red-600",
          // Collapsed state
          !isExpanded && showCollapseButton && "max-h-[400px]",
          hasHeader ? "rounded-t-none rounded-b-lg" : "rounded-lg",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        suppressHydrationWarning
        {...props}
      />

      {/* Expand gradient overlay */}
      {!isExpanded && showCollapseButton && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      )}

      {/* Expand button at bottom */}
      {!isExpanded && showCollapseButton && (
        <div className="flex justify-center -mt-8 relative z-10">
          <button
            onClick={toggleExpanded}
            className={cn(
              "px-4 py-1.5 rounded-md transition-all duration-200",
              "bg-background/90 backdrop-blur-sm border border-border",
              "hover:bg-muted hover:scale-105",
              "text-xs font-medium text-muted-foreground",
            )}
          >
            Show {remainingLines} more {remainingLines === 1 ? "line" : "lines"}
          </button>
        </div>
      )}

      {/* Copy Button */}
      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute right-2 p-2 rounded-md transition-all duration-200",
          "bg-background/80 backdrop-blur-sm border border-border",
          "opacity-0 group-hover:opacity-100",
          "hover:bg-muted hover:scale-105",
          "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary",
          hasHeader ? "top-12" : "top-2",
        )}
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
}
