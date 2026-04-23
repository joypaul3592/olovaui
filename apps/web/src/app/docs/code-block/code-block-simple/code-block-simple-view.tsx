import { SmCodeBlockCommand } from "./code-block-simple";

export default function CodeBlockSimpleView() {
  return (
    <SmCodeBlockCommand
      pnpm="pnpm dlx shadcn add @olovaui/code-block-command"
      yarn="yarn shadcn add @olovaui/code-block-command"
      npm="npx shadcn add @olovaui/code-block-command"
      bun="bunx --bun shadcn add @olovaui/code-block-command"
    />
  );
}
