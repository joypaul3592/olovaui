import Glassmorphism from "./glassmorphism";

export const GlassmorphismView = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full bg-[#0a0a0a] rounded-xl border border-white/10 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px]">
      <Glassmorphism />
    </div>
  );
};
