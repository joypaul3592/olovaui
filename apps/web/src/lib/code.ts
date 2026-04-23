export const extractCode = (filePath: string) => {
  if (typeof window !== "undefined") {
    return "";
  }

  // Lazy-load fs to avoid bundling in client builds.
  const nodeRequire =
    (typeof require !== "undefined" && require) ||
    (eval("require") as NodeRequire);
  const fs = nodeRequire("fs") as typeof import("fs");

  return fs.readFileSync(filePath, "utf-8");
};
