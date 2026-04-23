import fs from "fs";
import path from "path";

interface DocFile {
  filePath: string;
  outputName: string;
  content: string;
}

const docsSourcePath = path.join(__dirname, "../src/app/docs");
const docsOutputPath = path.join(__dirname, "../public/docs");

// Ensure output directory exists
if (!fs.existsSync(docsOutputPath)) {
  fs.mkdirSync(docsOutputPath, { recursive: true });
}

// Function to extract all content from MDX file and convert to markdown
function extractAllContentFromMDX(content: string): string {
  console.warn(`🔧 Step 1: Original length: ${content.length}`);

  // Step 1: Remove metadata export blocks (they're not content)
  let cleanContent = removeMetadataExports(content);
  console.warn(`🔧 Step 2: After metadata removal: ${cleanContent.length}`);

  // Step 2: Remove import statements (they're not content)
  cleanContent = removeImportStatements(cleanContent);
  console.warn(`🔧 Step 3: After import removal: ${cleanContent.length}`);

  // Step 3: Convert JSX to markdown-friendly format
  cleanContent = convertJSXToMarkdown(cleanContent);
  console.warn(`🔧 Step 4: After JSX conversion: ${cleanContent.length}`);

  // Step 4: Clean up whitespace
  cleanContent = cleanUpWhitespace(cleanContent);
  console.warn(`🔧 Step 5: Final length: ${cleanContent.length}`);

  return cleanContent;
}

// Remove export metadata blocks
function removeMetadataExports(content: string): string {
  const lines = content.split("\n");
  const result: string[] = [];
  let inExportBlock = false;
  let braceCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();

    if (
      trimmed.startsWith("export const metadata") ||
      trimmed.startsWith("export const")
    ) {
      inExportBlock = true;
      braceCount =
        (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      if (braceCount === 0) inExportBlock = false;
      continue;
    }

    if (inExportBlock) {
      braceCount +=
        (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      if (braceCount === 0) inExportBlock = false;
      continue;
    }

    result.push(line);
  }

  return result.join("\n");
}

// Remove import statements
function removeImportStatements(content: string): string {
  return content
    .replace(/^import\s+[\s\S]*?from\s*["'].*?["'];?\s*$/gm, "")
    .replace(/^import\s+["'].*?["'];?\s*$/gm, "");
}

// Convert JSX elements to markdown-friendly content
function convertJSXToMarkdown(content: string): string {
  const lines = content.split("\n");
  const result: string[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Preserve code blocks exactly as they are
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }

    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    // Process JSX - extract text content and preserve structure
    let processedLine = line;

    // Handle simple JSX tags - extract text content
    processedLine = processedLine.replace(
      /<([a-zA-Z][a-zA-Z0-9]*)[^>]*>(.*?)<\/\1>/g,
      "$2",
    );

    // Handle self-closing JSX tags with text attributes
    processedLine = processedLine.replace(
      /<([A-Z][a-zA-Z0-9]*)[^>]*value="([^"]*)"[^>]*>/g,
      "$2",
    );

    // Remove remaining JSX opening/closing tags but keep content between them
    processedLine = processedLine.replace(
      /^\s*<[A-Z][a-zA-Z0-9]*[^>]*>\s*$/g,
      "",
    );
    processedLine = processedLine.replace(/^\s*<\/[A-Z][a-zA-Z0-9]*>\s*$/g, "");
    processedLine = processedLine.replace(
      /^\s*<[a-z][a-zA-Z0-9]*[^>]*>\s*$/g,
      "",
    );
    processedLine = processedLine.replace(/^\s*<\/[a-z][a-zA-Z0-9]*>\s*$/g, "");

    // Remove self-closing JSX components
    processedLine = processedLine.replace(
      /^\s*<[A-Z][a-zA-Z0-9]*[^>]*\/>\s*$/g,
      "",
    );

    // Handle inline JSX - keep the text content
    processedLine = processedLine.replace(/<[^>]+>/g, "");

    // Only add non-empty lines or lines that aren't just whitespace
    if (processedLine.trim() !== "" || line.trim() === "") {
      result.push(processedLine);
    }
  }

  return result.join("\n");
}

// Clean up excessive whitespace while preserving structure
function cleanUpWhitespace(content: string): string {
  return (
    content
      // Remove excessive blank lines (more than 2 consecutive)
      .replace(/\n\s*\n\s*\n\s*\n+/g, "\n\n\n")
      // Remove trailing whitespace from lines
      .replace(/[ \t]+$/gm, "")
      // Remove leading/trailing whitespace from entire content
      .trim()
  );
}

// Function to get output filename from MDX file path
function getOutputFileName(filePath: string, docsRoot: string): string {
  const relativePath = path.relative(docsRoot, filePath);
  const dirName = path.dirname(relativePath);

  if (relativePath === "page.mdx") {
    return "index.md";
  }

  if (dirName === ".") {
    return path.basename(filePath, ".mdx") + ".md";
  }

  return `${dirName.replace(/[\\\/]/g, "-")}.md`;
}

// Function to recursively find all MDX files
function findAllMDXFiles(dir: string): string[] {
  const files: string[] = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findAllMDXFiles(fullPath));
      } else if (item.endsWith(".mdx")) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}:`, error);
  }

  return files;
}

console.warn(
  "🚀 Building documentation markdown files (preserving all content)...",
);

// Find all MDX files
const mdxFiles = findAllMDXFiles(docsSourcePath);

if (mdxFiles.length === 0) {
  console.warn("❌ No MDX files found in the docs directory.");
  process.exit(0);
}

const processedFiles: DocFile[] = [];

// Process each MDX file
for (const filePath of mdxFiles) {
  try {
    console.warn(`📖 Processing: ${path.relative(docsSourcePath, filePath)}`);

    const originalContent = fs.readFileSync(filePath, "utf-8");
    console.warn(
      `📄 Original content length: ${originalContent.length} characters`,
    );

    const markdownContent = extractAllContentFromMDX(originalContent);
    console.warn(
      `📝 Processed content length: ${markdownContent.length} characters`,
    );

    if (markdownContent.trim().length === 0) {
      console.warn(`⚠️  Warning: No content extracted from ${filePath}`);
      console.warn(
        `🔍 First 200 chars of original: ${originalContent.substring(0, 200)}`,
      );
      continue;
    }

    const outputName = getOutputFileName(filePath, docsSourcePath);

    processedFiles.push({
      filePath,
      outputName,
      content: markdownContent,
    });
  } catch (error) {
    console.error(`❌ Error processing file ${filePath}:`, error);
  }
}

// Write all markdown files
for (const docFile of processedFiles) {
  try {
    const outputPath = path.join(docsOutputPath, docFile.outputName);

    // Ensure directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, docFile.content, "utf-8");

    const sourceRelative = path.relative(docsSourcePath, docFile.filePath);
    console.warn(`✅ Generated: ${docFile.outputName} from ${sourceRelative}`);
  } catch (error) {
    console.error(`❌ Error writing file ${docFile.outputName}:`, error);
  }
}

console.warn(`\n🎉 Documentation build complete!`);
console.warn(
  `📊 Generated ${processedFiles.length} markdown files from ${mdxFiles.length} MDX files`,
);
console.warn(`📁 Files available at: /docs/<filename>.md\n`);

console.warn("📋 Generated files:");
processedFiles.forEach((file) => {
  console.warn(`   • /docs/${file.outputName}`);
});

console.warn("\n💡 Access your docs at:");
console.warn("   🔗 http://localhost:3000/docs/button.md");
console.warn("   🔗 http://localhost:3000/docs/installation.md");
console.warn("   🔗 http://localhost:3000/docs/index.md");
