import TheOriginal from "./the-original/the-original";
import DarkModeGlow from "./dark-mode-glow/dark-mode-glow";
import Glassmorphism from "./glassmorphism/glassmorphism";
import GhostOutline from "./ghost-outline/ghost-outline";
import SoftEcoSuccess from "./soft-eco-success/soft-eco-success";
import VividGradient from "./vivid-gradient/vivid-gradient";
import NeoBrutalism from "./neo-brutalism/neo-brutalism";
import DarkMinimalist from "./dark-minimalist/dark-minimalist";
import Pressable3D from "./pressable-3d/pressable-3d";
import FloatingOutlinePill from "./floating-outline-pill/floating-outline-pill";

const PreviewContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center min-h-[160px] w-full bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-white/10">
    {children}
  </div>
);

export const TheOriginalView = () => <PreviewContainer><TheOriginal /></PreviewContainer>;
export const DarkModeGlowView = () => <PreviewContainer><DarkModeGlow /></PreviewContainer>;
export const GlassmorphismView = () => (
  <div className="flex items-center justify-center min-h-[160px] w-full bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-white/10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px]">
    <Glassmorphism />
  </div>
);
export const GhostOutlineView = () => <PreviewContainer><GhostOutline /></PreviewContainer>;
export const SoftEcoSuccessView = () => <PreviewContainer><SoftEcoSuccess /></PreviewContainer>;
export const VividGradientView = () => <PreviewContainer><VividGradient /></PreviewContainer>;
export const NeoBrutalismView = () => <PreviewContainer><NeoBrutalism /></PreviewContainer>;
export const DarkMinimalistView = () => <PreviewContainer><DarkMinimalist /></PreviewContainer>;
export const Pressable3DView = () => <PreviewContainer><Pressable3D /></PreviewContainer>;
export const FloatingOutlinePillView = () => <PreviewContainer><FloatingOutlinePill /></PreviewContainer>;
