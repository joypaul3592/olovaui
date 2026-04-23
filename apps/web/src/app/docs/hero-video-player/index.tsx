import { HeroVideoDialog } from "@/components/ui/hero-video-player";

export const HeroVideoPlayerView = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-white/10 p-4 sm:p-8">
      <HeroVideoDialog
        videoSrc="https://www.youtube.com/embed/MFLVmAE4cqg"
        thumbnailSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        title="Watch our product demo"
      />
    </div>
  );
};
