import { extractCode } from "@/lib/code";
import { CodeBlockClient } from "./code-block.client";
import type { BuiltinLanguage } from "shiki";
import type { ReactElement } from "react";

type CodeBlockProps = {
  filePath?: string;
  code?: string;
  lang?: BuiltinLanguage;
};

const detectLanguageFromPath = (filePath: string): BuiltinLanguage => {
  const extension = filePath.split('.').pop()?.toLowerCase();

  const extensionMap: Record<string, BuiltinLanguage> = {
    'tsx': 'tsx',
    'jsx': 'jsx',
    'ts': 'typescript',
    'js': 'javascript',
    'mjs': 'javascript',
    'cjs': 'javascript',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'html': 'html',
    'htm': 'html',
    'json': 'json',
    'jsonc': 'jsonc',
    'json5': 'json5',
    'md': 'markdown',
    'mdx': 'markdown',
    'py': 'python',
    'pyw': 'python',
    'rs': 'rust',
    'go': 'go',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cxx': 'cpp',
    'cc': 'cpp',
    'h': 'c',
    'hpp': 'cpp',
    'hxx': 'cpp',
    'php': 'php',
    'rb': 'ruby',
    'swift': 'swift',
    'kt': 'kotlin',
    'dart': 'dart',
    'sql': 'sql',
    'yaml': 'yaml',
    'yml': 'yaml',
    'toml': 'toml',
    'xml': 'xml',
    'sh': 'bash',
    'bash': 'bash',
    'zsh': 'bash',
    'fish': 'bash',
    'ps1': 'powershell',
    'bat': 'batch',
    'cmd': 'batch',
    'vue': 'vue',
    'svelte': 'svelte',
    'astro': 'astro',
  };

  return extensionMap[extension || ''] || 'tsx';
};

export const CodeBlock = ({
  filePath,
  code = "",
  lang,
}: CodeBlockProps): ReactElement => {
  const fileContent = filePath ? extractCode(filePath) : code;
  const detectedLang = lang || (filePath ? detectLanguageFromPath(filePath) : "tsx");
  const fileName = filePath ? filePath.split('/').pop() || filePath : null;

  return (
    <CodeBlockClient
      code={fileContent}
      lang={detectedLang}
      fileName={fileName}
    />
  );
};
