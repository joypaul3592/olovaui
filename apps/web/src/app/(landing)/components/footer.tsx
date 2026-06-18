import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

const footerLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
  { label: "Installation", href: "/docs/installation" },
  { label: "Changelog", href: "/changelog" },
  { label: "Sponsor", href: "/sponsor" },
  { label: "GitHub", href: "https://github.com/olovalabs/olovaui" },
];

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      {/* CTA Section (replaces standalone FinalCta) */}
      <div className="relative border-t border-neutral-200 dark:border-white/5 px-4 py-20 sm:px-6">
        {/* Grid texture + glow, echoing the Hero cards */}
        <div className="absolute inset-0 -z-10 card-grid opacity-40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Start building with Olova UI
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Production-ready, accessible components you can drop straight
            into your project. Free, open source, and built for speed.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-all hover:bg-green-400 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.5)]"
            >
              Get Started
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="https://github.com/olovalabs/olovaui"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-6 py-3 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              Star on GitHub
            </Link>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="border-t border-neutral-200 dark:border-white/5 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Olova UI</p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              MIT licensed. Built by Nazmul Hossain.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-sm font-medium text-neutral-500 dark:text-neutral-400 transition hover:text-neutral-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40 rounded-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}