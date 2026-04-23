import { CodeBlockSelect } from "./code-block-select";

export default function CodeBlockSelectView() {
  return (
    <CodeBlockSelect
      pnpm="pnpm add olova"
      yarn="yarn add olova"
      npm="npm install olova"
      bun="bun add olova"
    />
  );
}
