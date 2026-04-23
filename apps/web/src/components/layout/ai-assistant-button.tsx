"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

interface AIButtonProps {
  dir?: "left" | "right";
  inline?: boolean;
}

type CopyState = "idle" | "copying" | "success" | "error";
type ExportFormat = "markdown" | "json" | "txt" | "html";


// Simple button component
const SimpleButton = ({
  children,
  onClick,
  className = "",
  title,
  disabled = false,
  variant = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  title?: string;
  disabled?: boolean;
  variant?: "default" | "primary" | "success" | "error";
}) => {
  const variants = {
    default:
      "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-800",
    primary: "bg-blue-600 border-blue-600 text-white hover:bg-blue-700",
    success: "bg-green-600 border-green-600 text-white hover:bg-green-700",
    error: "bg-red-600 border-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export function AIButton({ dir = "right", inline = false }: AIButtonProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [pageContent, setPageContent] = useState<string>("");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "https://olovaui.olova.net";
  const currentUrl = `${baseUrl}${pathname}`;

  // Function to fetch markdown content from the docs folder
  const fetchPageContent = useCallback(async () => {
    setIsLoading(true);
    try {
      // Extract the component name from pathname (e.g., /docs/button -> button)
      const match = pathname.match(/\/docs\/([^\/]+)/);
      const componentName = match ? match[1] : "index";

      const response = await fetch(`/docs/${componentName}.md`);
      if (response.ok) {
        const content = await response.text();
        setPageContent(content);
        setIsLoading(false);
        return content;
      }
    } catch (error) {
      console.error("Failed to fetch page content:", error);
    }

    // Fallback to page title and URL if markdown fetch fails
    const fallbackContent = `# ${document.title}\n\n${window.location.href}`;
    setPageContent(fallbackContent);
    setIsLoading(false);
    return fallbackContent;
  }, [pathname]);

  const handleCopyPage = useCallback(async () => {
    setCopyState("copying");
    try {
      const content = pageContent || (await fetchPageContent());
      await navigator.clipboard.writeText(content);
      setCopyState("success");

      setTimeout(() => setCopyState("idle"), 2000);
    } catch (error) {
      console.error("Failed to copy page content:", error);
      setCopyState("error");

      // Fallback copy
      try {
        await navigator.clipboard.writeText(
          `# ${document.title}\n\n${window.location.href}`,
        );
        setCopyState("success");
      } catch {
        setCopyState("error");
      }

      setTimeout(() => setCopyState("idle"), 2000);
    }
  }, [pageContent, fetchPageContent]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "k":
            e.preventDefault();
            setIsOpen(!isOpen);
            break;
          case "c":
            if (e.shiftKey) {
              e.preventDefault();
              handleCopyPage();
            }
            break;
        }
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, handleCopyPage]);

  // Load page content on mount and pathname change
  useEffect(() => {
    let active = true;

    const loadContent = async () => {
      setIsLoading(true);
      try {
        const match = pathname.match(/\/docs\/([^\/]+)/);
        const componentName = match ? match[1] : "index";
        const response = await fetch(`/docs/${componentName}.md`);

        if (!active) return;

        if (response.ok) {
          const content = await response.text();
          if (active) {
            setPageContent(content);
            setIsLoading(false);
          }
        } else {
          throw new Error("Failed to load");
        }
      } catch (error) {
        if (!active) return;
        console.error("Failed to fetch page content:", error);
        const fallbackContent = `# ${document.title}\n\n${window.location.href}`;
        setPageContent(fallbackContent);
        setIsLoading(false);
      }
    };

    loadContent();
    return () => { active = false; };
  }, [pathname]);

  const getEnhancedPrompt = (platform: string, url: string) => {
    const match = url.match(/\/docs\/([^\/]+)/);
    const componentName = match ? match[1] : "component";

    const basePrompt = `I'm working with SeraUI's ${componentName} component from ${url}.`;

    switch (platform) {
      case "chatgpt":
        return `${basePrompt} Please provide:
1. A comprehensive explanation of all available props and their types
2. Common usage patterns and best practices
3. Styling customization options
4. Accessibility considerations
5. Real-world implementation examples

Current page content:
\`\`\`
${pageContent.substring(0, 1000)}${pageContent.length > 1000 ? "..." : ""}
\`\`\``;

      case "claude":
        return `${basePrompt} I need help understanding:
- Component API and prop definitions
- Advanced customization techniques
- Integration with other UI libraries
- Performance optimization tips
- Common troubleshooting scenarios

Documentation snippet:
${pageContent.substring(0, 1000)}${pageContent.length > 1000 ? "..." : ""}`;

      default:
        return basePrompt;
    }
  };

  const chatGptUrl = `https://chatgpt.com/?model=gpt-4&q=${encodeURIComponent(
    getEnhancedPrompt("chatgpt", currentUrl),
  )}`;

  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(
    getEnhancedPrompt("claude", currentUrl),
  )}`;

  const handleExport = async (format: ExportFormat) => {
    const content = pageContent || (await fetchPageContent());
    const componentName =
      pathname.match(/\/docs\/([^\/]+)/)?.[1] || "component";

    let exportContent = content;
    const filename = `${componentName}.${format}`;
    let mimeType = "text/plain";

    switch (format) {
      case "json":
        exportContent = JSON.stringify(
          {
            title: document.title,
            url: window.location.href,
            content: content,
            timestamp: new Date().toISOString(),
            component: componentName,
          },
          null,
          2,
        );
        mimeType = "application/json";
        break;
      case "html":
        exportContent = `<!DOCTYPE html>
<html>
<head>
  <title>${document.title}</title>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
    pre { background: #f5f5f5; padding: 1rem; border-radius: 0.5rem; }
    code { background: #f0f0f0; padding: 0.2rem 0.4rem; border-radius: 0.25rem; }
  </style>
</head>
<body>
  <pre>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
</body>
</html>`;
        mimeType = "text/html";
        break;
      case "txt":
        mimeType = "text/plain";
        break;
      default:
        mimeType = "text/markdown";
    }

    const blob = new Blob([exportContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleChatGPTClick = () => {
    window.open(chatGptUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleClaudeClick = () => {
    window.open(claudeUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleV0Click = () => {
    const prompt = encodeURIComponent(
      `Create a React component based on this SeraUI documentation:\n\n${pageContent.substring(0, 1500)}`,
    );
    window.open(
      `https://v0.dev?prompt=${prompt}`,
      "_blank",
      "noopener,noreferrer",
    );
    setIsOpen(false);
  };



  if (inline) {
    return (
      <div className="relative float-right ml-2 items-center">
        <div className="flex gap-2">
          {/* Copy Page Button */}
          <SimpleButton
            onClick={handleCopyPage}
            title="Copy page content (Ctrl+Shift+C)"
            disabled={copyState === "copying"}
            variant={
              copyState === "success"
                ? "success"
                : copyState === "error"
                  ? "error"
                  : "default"
            }
            className="text-xs"
          >
            {copyState === "copying" ? (
              <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : copyState === "success" ? (
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : copyState === "error" ? (
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            )}
            {copyState === "success"
              ? "Copied!"
              : copyState === "error"
                ? "Failed"
                : "Copy"}
          </SimpleButton>

          {/* Toggle Button */}
          <SimpleButton
            onClick={() => setIsOpen(!isOpen)}
            title="AI Assistant options (Ctrl+K)"
            className="text-xs px-2"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SimpleButton>
        </div>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="shadow-xl dark:shadow-none shadow-gray-500/5 dark:shadow-gray-500/5 bg-white dark:bg-gray-950 absolute z-50 overflow-y-auto rounded-xl text-gray-950/70 dark:text-white/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 inline-flex max-h-[420px] p-1 border border-gray-200 dark:border-white/[0.07] flex-col top-full right-0 mt-2 min-w-[320px]">

              {/* Copy page */}
              <div
                role="menuitem"
                onClick={handleCopyPage}
                className="text-sm group dark:focus:bg-gray-200/5 relative w-full select-none outline-0 focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:cursor-default data-[disabled]:opacity-50 text-gray-950/50 dark:text-white/50 hover:text-gray-950/75 dark:hover:text-white/75 focus:text-gray-950/75 dark:focus:text-white/75 flex items-center justify-normal px-1.5 py-1.5 gap-1 hover:bg-gray-600/5 dark:hover:bg-gray-200/5 cursor-pointer rounded-lg"
              >
                <div className="border border-gray-200 dark:border-white/[0.07] rounded-lg p-1.5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 shrink-0"
                  >
                    <path
                      d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col px-1">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-300 flex items-center gap-1">
                    Copy page
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Copy page as Markdown for LLMs
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`lucide lucide-check size-3.5 text-primary dark:text-primary-light shrink-0 ml-auto ${copyState === "success" ? "opacity-100" : "opacity-0"}`}
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              {/* View as Markdown */}
              <div
                role="menuitem"
                onClick={() => handleExport("markdown")}
                className="text-sm group dark:focus:bg-gray-200/5 relative w-full select-none outline-0 focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:cursor-default data-[disabled]:opacity-50 text-gray-950/50 dark:text-white/50 hover:text-gray-950/75 dark:hover:text-white/75 focus:text-gray-950/75 dark:focus:text-white/75 flex items-center justify-normal px-1.5 py-1.5 gap-1 hover:bg-gray-600/5 dark:hover:bg-gray-200/5 cursor-pointer rounded-lg"
              >
                <div className="border border-gray-200 dark:border-white/[0.07] rounded-lg p-1.5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 shrink-0"
                  >
                    <path
                      d="M15.25 3.75H2.75C1.64543 3.75 0.75 4.64543 0.75 5.75V12.25C0.75 13.3546 1.64543 14.25 2.75 14.25H15.25C16.3546 14.25 17.25 13.3546 17.25 12.25V5.75C17.25 4.64543 16.3546 3.75 15.25 3.75Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.75 11.25V6.75H8.356L6.25 9.5L4.144 6.75H3.75V11.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.5 9.5L13.25 11.25L15 9.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.25 11.25V6.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col px-1">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-300 flex items-center gap-1">
                    View as Markdown
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-up-right w-3 h-3 text-gray-600 dark:text-gray-400 shrink-0"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    View this page as plain text
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check size-3.5 text-primary dark:text-primary-light shrink-0 opacity-0 ml-auto"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              {/* Open in ChatGPT */}
              <div
                role="menuitem"
                onClick={handleChatGPTClick}
                className="text-sm group dark:focus:bg-gray-200/5 relative w-full select-none outline-0 focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:cursor-default data-[disabled]:opacity-50 text-gray-950/50 dark:text-white/50 hover:text-gray-950/75 dark:hover:text-white/75 focus:text-gray-950/75 dark:focus:text-white/75 flex items-center justify-normal px-1.5 py-1.5 gap-1 hover:bg-gray-600/5 dark:hover:bg-gray-200/5 cursor-pointer rounded-lg"
              >
                <div className="border border-gray-200 dark:border-white/[0.07] rounded-lg p-1.5">
                  <svg
                    fill="currentColor"
                    fillRule="evenodd"
                    height="1em"
                    viewBox="0 0 24 24"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 shrink-0"
                  >
                    <title>OpenAI</title>
                    <path d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z" />
                  </svg>
                </div>
                <div className="flex flex-col px-1">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-300 flex items-center gap-1">
                    Open in ChatGPT
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-up-right w-3 h-3 text-gray-600 dark:text-gray-400 shrink-0"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Ask questions about this page
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check size-3.5 text-primary dark:text-primary-light shrink-0 opacity-0 ml-auto"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              {/* Open in Claude */}
              <div
                role="menuitem"
                onClick={handleClaudeClick}
                className="text-sm group dark:focus:bg-gray-200/5 relative w-full select-none outline-0 focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:cursor-default data-[disabled]:opacity-50 text-gray-950/50 dark:text-white/50 hover:text-gray-950/75 dark:hover:text-white/75 focus:text-gray-950/75 dark:focus:text-white/75 flex items-center justify-normal px-1.5 py-1.5 gap-1 hover:bg-gray-600/5 dark:hover:bg-gray-200/5 cursor-pointer rounded-lg"
              >
                <div className="border border-gray-200 dark:border-white/[0.07] rounded-lg p-1.5">
                  <svg
                    fill="currentColor"
                    fillRule="evenodd"
                    height="1em"
                    viewBox="0 0 256 257"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 shrink-0"
                    preserveAspectRatio="xMidYMid"
                  >
                    <title>Anthropic</title>
                    <path d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z" />
                  </svg>
                </div>
                <div className="flex flex-col px-1">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-300 flex items-center gap-1">
                    Open in Claude
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-up-right w-3 h-3 text-gray-600 dark:text-gray-400 shrink-0"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Ask questions about this page
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check size-3.5 text-primary dark:text-primary-light shrink-0 opacity-0 ml-auto"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex ${dir === "left" ? "justify-start" : "justify-end"} mb-6`}
    >
      <div className="relative">
        <div className="flex gap-3">
          {/* Copy Page Button */}
          <SimpleButton
            onClick={handleCopyPage}
            title="Copy page content (Ctrl+Shift+C)"
            disabled={copyState === "copying" || isLoading}
            variant={
              copyState === "success"
                ? "success"
                : copyState === "error"
                  ? "error"
                  : "primary"
            }
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : copyState === "copying" ? (
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : copyState === "success" ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : copyState === "error" ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            )}
            {copyState === "success"
              ? "Copied!"
              : copyState === "error"
                ? "Failed"
                : isLoading
                  ? "Loading..."
                  : "Copy Page"}
          </SimpleButton>

          {/* AI Assistant Toggle */}
          <SimpleButton
            onClick={() => setIsOpen(!isOpen)}
            title="AI Assistant options (Ctrl+K)"
            variant="default"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
            AI Assistant
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SimpleButton>
        </div>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div
              className={`shadow-xl dark:shadow-none shadow-gray-500/5 dark:shadow-gray-500/5 bg-white dark:bg-gray-950 relative z-50 overflow-y-auto rounded-xl text-gray-950/70 dark:text-white/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 inline-flex max-h-[420px] p-1 border border-gray-200 dark:border-white/[0.07] flex-col absolute top-full ${dir === "left" ? "left-0" : "right-0"} mt-2 min-w-[320px]`}
            >
              <button
                onClick={() => handleExport("markdown")}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0-1.125.504-1.125 1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                Export Markdown
              </button>

              <button
                onClick={handleV0Click}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <text
                    x="12"
                    y="16"
                    fontSize="10"
                    textAnchor="middle"
                    fill="white"
                  >
                    v0
                  </text>
                </svg>
                Open in v0
              </button>

              <div className="border-t border-gray-200 dark:border-gray-800 my-1" />

              <button
                onClick={handleChatGPTClick}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a .068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a .065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a .71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z" />
                </svg>
                ChatGPT
              </button>

              <button
                onClick={handleClaudeClick}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
                </svg>
                Claude
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
