import React from "react";
import type { MDXComponents } from "mdx/types";
import { createSlug, cn } from "./lib/utils";
import { CodeBlock } from "./components/layout/code-block";
import { SimpleCodeBlock } from "./components/ui/simple-code-block";
import { ComponentRenderer } from "./components/layout/component-renderer";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./components/layout/tabs";
import { Cli } from "./components/layout/cli";
import { PropsTable } from "./components/layout/props-table";
import { Table, StatusBadge } from "./components/ui/table";
import { AIButtonLazy as AIButton } from "./components/layout/ai-assistant-button.lazy";
import { Alert, Collapsible } from "@/components/layout/mdx-interactive";
import {
  PackageManagerTabs as PMTabs,
  PMTabContent,
  NPMTabContent,
  PNPMTabContent,
  YarnTabContent,
  BunTabContent,
} from "./components/layout/package-manager-tabs";
import {
  Star,
  ExternalLink,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

type AlertWrapperProps = React.ComponentProps<"div"> & {
  title?: string;
  dismissible?: boolean;
};

const InfoNote = ({
  children,
  title = "Info",
  ...props
}: AlertWrapperProps) => {
  return (
    <Alert variant="info" title={title} {...props}>
      {children}
    </Alert>
  );
};

const Warning = ({
  children,
  title = "Warning",
  ...props
}: AlertWrapperProps) => {
  return (
    <Alert variant="warning" title={title} {...props}>
      {children}
    </Alert>
  );
};

const ErrorNote = ({
  children,
  title = "Error",
  ...props
}: AlertWrapperProps) => {
  return (
    <Alert variant="error" title={title} {...props}>
      {children}
    </Alert>
  );
};

const Success = ({
  children,
  title = "Success",
  ...props
}: AlertWrapperProps) => {
  return (
    <Alert variant="success" title={title} {...props}>
      {children}
    </Alert>
  );
};

const Tip = ({
  children,
  title = "Good to Know",
  ...props
}: AlertWrapperProps) => {
  return (
    <Alert variant="tip" title={title} {...props}>
      {children}
    </Alert>
  );
};

const Underline = ({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) => {
  return (
    <span className={cn("doc-underline", className)} {...props}>
      {children}
    </span>
  );
};


// Badge Component
const Badge = ({
  children,
  variant = "default",
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?:
  | "default"
  | "secondary"
  | "destructive"
  | "success"
  | "warning"
  | "info";
  className?: string;
}) => {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Progress Component
const Progress = ({
  value,
  max = 100,
  className,
  showValue = true,
  variant = "default",
  ...props
}: {
  value: number;
  max?: number;
  className?: string;
  showValue?: boolean;
  variant?: "default" | "success" | "warning" | "danger";
}) => {
  const percentage = (value / max) * 100;

  const variants = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  return (
    <div className={cn("w-full my-4", className)} {...props}>
      {showValue && (
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>
            {value}/{max}
          </span>
        </div>
      )}
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            variants[variant],
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Stats Component
const Stats = ({
  data,
  className,
  ...props
}: {
  data: Array<{
    label: string;
    value: string | number;
    change?: number;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6",
        className,
      )}
      {...props}
    >
      {data.map((stat, index) => (
        <div key={index} className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.change !== undefined && (
                <p
                  className={cn(
                    "text-sm flex items-center gap-1",
                    stat.change > 0
                      ? "text-green-600"
                      : stat.change < 0
                        ? "text-red-600"
                        : "text-muted-foreground",
                  )}
                >
                  {stat.change > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : stat.change < 0 ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : null}
                  {Math.abs(stat.change)}%
                </p>
              )}
            </div>
            {stat.icon && (
              <stat.icon className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Card Component
const Card = ({
  children,
  title,
  description,
  footer,
  className,
  ...props
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("bg-card border rounded-lg shadow-sm my-4", className)}
      {...props}
    >
      {(title || description) && (
        <div className="p-6 pb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      <div className={cn("p-6", title || description ? "pt-0" : "")}>
        {children}
      </div>
      {footer && <div className="p-6 pt-0 border-t">{footer}</div>}
    </div>
  );
};

// Timeline Component
const Timeline = ({
  items,
  className,
  ...props
}: {
  items: Array<{
    title: string;
    description?: string;
    date?: string;
    status?: "completed" | "current" | "upcoming";
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  className?: string;
}) => {
  return (
    <div className={cn("relative my-6", className)} {...props}>
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
      {items.map((item, index) => {
        const Icon = item.icon || Calendar;
        const isLast = index === items.length - 1;

        return (
          <div
            key={index}
            className={cn(
              "relative flex items-start gap-4 pb-6",
              isLast && "pb-0",
            )}
          >
            <div
              className={cn(
                "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2",
                item.status === "completed"
                  ? "bg-green-500 border-green-500 text-white"
                  : item.status === "current"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-background border-border text-muted-foreground",
              )}
            >
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{item.title}</h4>
                {item.date && (
                  <span className="text-sm text-muted-foreground">
                    {item.date}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-muted-foreground mt-1">{item.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Feature Grid Component
const FeatureGrid = ({
  features,
  columns = 2,
  className,
  ...props
}: {
  features: Array<{
    title: string;
    description: string;
    icon?: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
  }>;
  columns?: number;
  className?: string;
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid gap-6 my-6",
        gridCols[columns as keyof typeof gridCols],
        className,
      )}
      {...props}
    >
      {features.map((feature, index) => {
        const Icon = feature.icon || Star;

        return (
          <div
            key={index}
            className={cn(
              "p-6 rounded-lg border bg-card",
              feature.highlight && "ring-2 ring-primary/20 bg-primary/5",
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  feature.highlight
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted",
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
            </div>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
};

// Media Components
const MediaEmbed = ({
  src,
  type = "auto",
  title,
  className,
  ...props
}: {
  src: string;
  type?: "auto" | "video" | "image" | "iframe";
  title?: string;
  className?: string;
}) => {
  const detectType = (url: string) => {
    if (type !== "auto") return type;
    if (/\.(mp4|webm|ogg)$/i.test(url)) return "video";
    if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(url)) return "image";
    if (/youtube|vimeo|codepen/i.test(url)) return "iframe";
    return "iframe";
  };

  const mediaType = detectType(src);

  const renderMedia = () => {
    switch (mediaType) {
      case "video":
        return (
          <video controls className="w-full h-auto" title={title}>
            <source src={src} />
            Your browser does not support the video tag.
          </video>
        );
      case "image":
        return <img src={src} alt={title || ""} className="w-full h-auto" />;
      case "iframe":
        return (
          <iframe
            src={src}
            title={title || "Embedded content"}
            className="w-full h-96"
            frameBorder="0"
            allowFullScreen
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "my-6 rounded-lg overflow-hidden border bg-card",
        className,
      )}
      {...props}
    >
      {title && (
        <div className="p-4 border-b">
          <h3 className="font-medium">{title}</h3>
        </div>
      )}
      <div className="relative">{renderMedia()}</div>
    </div>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    h1: ({ children, ...props }: React.ComponentProps<"h1">) => {
      const id = createSlug(children?.toString() || "");
      const processedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === "AI") {
          return React.cloneElement(child, {
            inline: true,
          } as React.ComponentProps<typeof AIButton>);
        }
        return child;
      });
      return (
        <h1
          id={id}
          className="scroll-m-20 text-4xl font-bold tracking-tight mb-2 pt-1 first:pt-0 text-foreground"
          {...props}
        >
          {processedChildren}
        </h1>
      );
    },

    h2: ({ children, ...props }: React.ComponentProps<"h2">) => {
      const id = createSlug(children?.toString() || "");
      const processedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === "AI") {
          return React.cloneElement(child, {
            inline: true,
          } as React.ComponentProps<typeof AIButton>);
        }
        return child;
      });
      return (
        <h2
          id={id}
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mt-10 mb-4 first:mt-0 text-foreground"
          {...props}
        >
          {processedChildren}
        </h2>
      );
    },

    h3: ({ children, ...props }: React.ComponentProps<"h3">) => {
      const id = createSlug(children?.toString() || "");
      const processedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === "AI") {
          return React.cloneElement(child, {
            inline: true,
          } as React.ComponentProps<typeof AIButton>);
        }
        return child;
      });
      return (
        <h3
          id={id}
          className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-4 first:mt-0 text-foreground"
          {...props}
        >
          {processedChildren}
        </h3>
      );
    },

    h4: ({ children, ...props }: React.ComponentProps<"h4">) => {
      const id = createSlug(children?.toString() || "");
      const processedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === "AI") {
          return React.cloneElement(child, {
            inline: true,
          } as React.ComponentProps<typeof AIButton>);
        }
        return child;
      });
      return (
        <h4
          id={id}
          className="scroll-m-20 text-lg font-semibold tracking-tight mt-6 mb-2 first:mt-0 text-foreground"
          {...props}
        >
          {processedChildren}
        </h4>
      );
    },

    h5: ({ children, ...props }: React.ComponentProps<"h5">) => {
      const id = createSlug(children?.toString() || "");
      return (
        <h5
          id={id}
          className="scroll-m-20 text-base font-semibold tracking-tight mt-6 mb-2 first:mt-0 text-foreground"
          {...props}
        >
          {children}
        </h5>
      );
    },

    h6: ({ children, ...props }: React.ComponentProps<"h6">) => {
      const id = createSlug(children?.toString() || "");
      return (
        <h6
          id={id}
          className="scroll-m-20 text-sm font-semibold tracking-tight mt-6 mb-2 first:mt-0 text-foreground"
          {...props}
        >
          {children}
        </h6>
      );
    },

    p: ({ children, ...props }: React.ComponentProps<"p">) => {
      return (
        <p className="leading-7 mt-6 first:mt-0 text-foreground" {...props}>
          {children}
        </p>
      );
    },

    ul: ({ children, ...props }: React.ComponentProps<"ul">) => {
      return (
        <ul
          className="mt-6 mb-6 ml-6 list-disc [&>li]:mt-2 first:mt-0"
          {...props}
        >
          {children}
        </ul>
      );
    },

    ol: ({ children, ...props }: React.ComponentProps<"ol">) => {
      return (
        <ol
          className="mt-6 mb-6 ml-6 list-decimal [&>li]:mt-2 first:mt-0"
          {...props}
        >
          {children}
        </ol>
      );
    },

    li: ({ children, ...props }: React.ComponentProps<"li">) => {
      return (
        <li className="text-foreground" {...props}>
          {children}
        </li>
      );
    },

    blockquote: ({
      children,
      ...props
    }: React.ComponentProps<"blockquote">) => {
      return (
        <blockquote
          className="mt-6 mb-6 border-l-2 pl-6 italic text-foreground/80 first:mt-0"
          {...props}
        >
          {children}
        </blockquote>
      );
    },

    code: ({ children, className, ...props }: React.ComponentProps<"code">) => {
      if (className?.includes("language-")) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      return (
        <code
          className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    },

    pre: ({ children, className, id, style }: React.ComponentProps<"pre">) => {
      return (
        <SimpleCodeBlock className={className} id={id} style={style}>
          {children}
        </SimpleCodeBlock>
      );
    },

    table: ({ children, ...props }: React.ComponentProps<"table">) => {
      return (
        <div className="mt-6 mb-6 w-full overflow-y-auto first:mt-0">
          <table
            className="w-full border-collapse border border-border"
            {...props}
          >
            {children}
          </table>
        </div>
      );
    },

    thead: ({ children, ...props }: React.ComponentProps<"thead">) => {
      return (
        <thead className="bg-muted/50" {...props}>
          {children}
        </thead>
      );
    },

    tbody: ({ children, ...props }: React.ComponentProps<"tbody">) => {
      return (
        <tbody className="[&_tr:last-child]:border-0" {...props}>
          {children}
        </tbody>
      );
    },

    tr: ({ children, ...props }: React.ComponentProps<"tr">) => {
      return (
        <tr
          className="border-b border-border transition-colors hover:bg-muted/50"
          {...props}
        >
          {children}
        </tr>
      );
    },

    th: ({ children, ...props }: React.ComponentProps<"th">) => {
      return (
        <th
          className="h-12 px-4 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0"
          {...props}
        >
          {children}
        </th>
      );
    },

    td: ({ children, ...props }: React.ComponentProps<"td">) => {
      return (
        <td
          className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-foreground"
          {...props}
        >
          {children}
        </td>
      );
    },

    a: ({ children, href, ...props }: React.ComponentProps<"a">) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          className={cn(
            "font-medium text-primary underline underline-offset-4 hover:no-underline",
            isExternal && "inline-flex items-center gap-1",
          )}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          {...props}
        >
          {children}
          {isExternal && <ExternalLink className="w-3 h-3" />}
        </a>
      );
    },

    strong: ({ children, ...props }: React.ComponentProps<"strong">) => {
      return (
        <strong className="font-semibold text-foreground" {...props}>
          {children}
        </strong>
      );
    },

    em: ({ children, ...props }: React.ComponentProps<"em">) => {
      return (
        <em className="italic text-foreground" {...props}>
          {children}
        </em>
      );
    },

    hr: ({ ...props }: React.ComponentProps<"hr">) => {
      return <hr className="my-8 border-border" {...props} />;
    },

    del: ({ children, ...props }: React.ComponentProps<"del">) => {
      return (
        <del className="line-through opacity-70 text-foreground" {...props}>
          {children}
        </del>
      );
    },

    input: ({
      type,
      checked,
      disabled,
      ...props
    }: React.ComponentProps<"input">) => {
      if (type === "checkbox") {
        return (
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="mr-2 accent-primary"
            {...props}
          />
        );
      }
      return <input type={type} {...props} />;
    },

    kbd: ({ children, ...props }: React.ComponentProps<"kbd">) => {
      return (
        <kbd
          className="inline-flex items-center rounded border border-border bg-muted px-2 py-1 text-xs font-mono text-foreground"
          {...props}
        >
          {children}
        </kbd>
      );
    },

    mark: ({ children, ...props }: React.ComponentProps<"mark">) => {
      return (
        <mark
          className="bg-yellow-200 dark:bg-yellow-800/50 px-1 rounded"
          {...props}
        >
          {children}
        </mark>
      );
    },

    sub: ({ children, ...props }: React.ComponentProps<"sub">) => {
      return (
        <sub className="text-xs text-foreground" {...props}>
          {children}
        </sub>
      );
    },

    sup: ({ children, ...props }: React.ComponentProps<"sup">) => {
      return (
        <sup className="text-xs text-foreground" {...props}>
          {children}
        </sup>
      );
    },

    u: ({ children, ...props }: React.ComponentProps<"u">) => {
      return (
        <u className="doc-underline no-underline" {...props}>
          {children}
        </u>
      );
    },

    // Custom components
    CodeBlock,
    ComponentRenderer,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Cli,
    PropsTable,
    Table,
    StatusBadge,
    AI: AIButton,
    PMTabs,
    PMTabContent,
    NPMTabContent,
    PNPMTabContent,
    YarnTabContent,
    BunTabContent,

    // Enhanced components
    Alert,
    Info: InfoNote,
    Warning,
    Error: ErrorNote,
    Success,
    Tip,
    Underline,
    Collapsible,
    Badge,
    Progress,
    Stats,
    Card,
    Timeline,
    FeatureGrid,
    MediaEmbed,
  };
}
