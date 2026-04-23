
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative isolate min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white px-4 py-20">
      {/* Top Badge */}
      <div className="mb-8 animate-fade-in-up">
        <Link
          href="/changelog"
          className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-4 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
        >
          <span className="text-neutral-900 dark:text-white">
            Introducing v1
          </span>
          <span className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />
          <span className="flex items-center gap-1 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
            View Changelog <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Hero Title */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white">
          <span className="block">Beautiful</span>
          <span className="inline-flex items-center gap-2 flex-wrap justify-center">
            Pre-built UI Library
          </span>
          <br />
          for Busy & Smart devs.
        </h1>
      </div>

      {/* Description */}
      <p className="max-w-2xl mx-auto text-center text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
        Accelerate your development with production-ready components.
        <br className="hidden sm:block" />
        Beautifully crafted, accessible, and fully customizable.
      </p>

      {/* Feature Cards */}
      <div className="w-full max-w-5xl px-4 md:px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Card 1: Quickstart */}
          <Link href="/docs" className="group block">
            {/* Visual Container */}
            <div className="bg-neutral-50 dark:bg-[#080c09] border border-neutral-200 dark:border-white/5 rounded-2xl overflow-hidden relative aspect-[16/10] transition-all duration-300 group-hover:border-green-500/30 group-hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.15)]">
              {/* Inner Grid Texture */}
              <div className="absolute inset-0 card-grid opacity-40"></div>

              {/* Content (Rocket Icon) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-32 h-32 text-green-500/80 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  {/* Rocket Body */}
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  {/* Window circle */}
                  <circle cx="15" cy="9" r="2" fill="currentColor" fillOpacity="0.1" />
                </svg>
              </div>
            </div>

            {/* Text Info */}
            <div className="mt-5 text-left">
              <h3 className="text-neutral-900 dark:text-white font-semibold text-lg mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Quickstart</h3>
              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                Deploy your first docs site in minutes with our step-by-step guide
              </p>
            </div>
          </Link>

          {/* Card 2: CLI Installation */}
          <Link href="#" className="group block">
            {/* Visual Container */}
            <div className="bg-neutral-50 dark:bg-[#080c09] border border-neutral-200 dark:border-white/5 rounded-2xl overflow-hidden relative aspect-[16/10] transition-all duration-300 group-hover:border-green-500/30 group-hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.15)]">
              {/* Inner Grid Texture */}
              <div className="absolute inset-0 card-grid opacity-40"></div>

              {/* Content (Terminal Icon) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-40 h-32 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                  {/* Back Window (Ghost) */}
                  <svg className="absolute top-0 right-0 w-32 h-24 text-green-500/20 translate-x-4 -translate-y-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  </svg>

                  {/* Front Window (Main) */}
                  <svg className="absolute bottom-0 left-0 w-36 h-28 text-green-500/80 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)] bg-white/80 dark:bg-[#080c09]/80 backdrop-blur-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="18" rx="2" ry="2" fill="none" />
                    <line x1="6" y1="3" x2="6" y2="21" strokeOpacity="0.2" />
                    <path d="m8 9 3 3-3 3" />
                    <line x1="13" y1="15" x2="16" y2="15" />
                    {/* Dots in top right */}
                    <circle cx="17" cy="6" r="0.5" fill="currentColor" />
                    <circle cx="19" cy="6" r="0.5" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Text Info */}
            <div className="mt-5 text-left">
              <h3 className="text-neutral-900 dark:text-white font-semibold text-lg mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">CLI installation</h3>
              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                Install the CLI to preview and develop your docs locally
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Background decoration (optional, keeping it very subtle) */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-100/50 via-white to-white dark:from-neutral-900/50 dark:via-neutral-950 dark:to-neutral-950 pointer-events-none" />
    </div>
  );
};
