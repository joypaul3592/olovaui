"use client"

import { CodeBlockCommand } from './code-block-command';

export default function CodeBlockNatural() {
  return (
    <CodeBlockCommand
      pnpm="pnpm dlx shadcn add @olovaui/code-block-command"
      yarn="yarn shadcn add @olovaui/code-block-command"
      npm="npx shadcn add @olovaui/code-block-command"
      bun="bunx --bun shadcn add @olovaui/code-block-command"
    />
  );
}
