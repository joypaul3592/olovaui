"use client";
import { GitHubIcon } from "@/assets/icons/github";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./theme";

import Logo from "@/assets/olova.png";
import { Linkedin, X } from "lucide-react";
import dynamic from "next/dynamic";
import NextImage from "next/image";
const SidebarMobile = dynamic(
  () => import("./sidebar-mobile").then((mod) => mod.SidebarMobile),
  { ssr: false }
);
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/navigation";
import { componentsNavigation } from "@/constants/components-navigation";

const SearchModal = dynamic(
  () => import("./search-modal").then((mod) => mod.SearchModal),
  { ssr: false }
);
import SupportAlertBanner from "./support-alert-banner";

const GitHubStarBadge = ({ repo: _repo }: { repo: string }) => {
  // Using a static placeholder value for static export
  // This value should be updated via build-time script
  const staticStars = 0; // This will be replaced with actual star count during build

  const formatStars = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <Link
      href="https://github.com/olovalabs/olovaui"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 h-9 rounded-full bg-secondary hover:bg-accent transition-colors duration-200"
      aria-label="GitHub"
    >
      <span className="text-xs font-medium text-muted-foreground">
        {formatStars(staticStars)}
      </span>
      <GitHubIcon className="h-4 w-4 fill-foreground" />
    </Link>
  );
};

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isComponentsRoute = pathname?.startsWith("/components");
  const sidebarItems = isComponentsRoute ? componentsNavigation : navigation;
  const sidebarFooterLink = isComponentsRoute
    ? undefined
    : { label: "Getting Started Guide", href: "/docs" };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <SupportAlertBanner />
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-200 md:hidden ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 z-40 h-full w-4/5 bg-background md:hidden transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="w-full px-6 py-4 flex items-center justify-between border-b border-border">
          <Link href="/" className="flex items-center">
            <NextImage src={Logo} alt="logo" width={28} height={28} className="size-7" />
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-foreground"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>
        {sidebarOpen ? (
          <SidebarMobile
            onClose={() => setSidebarOpen(false)}
            items={sidebarItems}
            footerLink={sidebarFooterLink}
          />
        ) : null}
      </div>

      <div className={`w-full mx-auto max-w-[1536px] sticky top-0 z-[9998] backdrop-blur-xl border-b border-l border-r border-border px-4 md:px-5 transition-all duration-300 ${isScrolled ? 'bg-background/95 shadow-md' : 'bg-background/60'}`}>
        <header className="h-14 flex items-center justify-between">
          <div className="flex items-center gap-8 md:gap-10">
            <div className="flex items-center gap-3">
              {
                <button
                  onClick={toggleSidebar}
                  className="flex h-11 w-11 flex-col items-center justify-center gap-1 md:hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  aria-label="Open menu"
                  aria-expanded={sidebarOpen}
                >
                  <span className="w-5 h-0.5 bg-foreground rounded-full" />
                  <span className="w-3 h-0.5 bg-foreground rounded-full" />
                  <span className="w-4 h-0.5 bg-foreground rounded-full" />
                </button>
              }

              <Link href="/" className="flex items-center gap-2">
                <NextImage src={Logo} alt="logo" width={28} height={28} className="size-7" />
                <div className="hidden md:flex items-center gap-2">
                  <span className="font-semibold text-lg text-foreground">
                    Olova&nbsp;UI
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium bg-muted/50 backdrop-blur-sm border border-border rounded-full text-muted-foreground">
                    Beta
                  </span>
                </div>
              </Link>
            </div>
            <nav className=" hidden md:flex items-center gap-5 text-sm font-medium text-foreground/80">
              <Link
                className="hover:text-foreground"
                href="/docs"
              >
                Docs
              </Link>
              <Link
                className="hover:text-zinc-900 dark:hover:text-zinc-50"
                href="/components"
              >
                Components
              </Link>
            </nav>
          </div>
          <nav className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-between gap-3 px-3 py-2 h-9 rounded-md bg-muted/80 border border-border hover:bg-accent transition-all duration-200 text-left md:min-w-[280px] cursor-pointer backdrop-blur-sm"
              aria-label="Search"
            >
              <div className="flex items-center gap-2">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-muted-foreground flex-shrink-0"
                >
                  <path
                    d="M10 3.347c1.138 0 2.213.266 3.163.739-.255.462-.74.764-1.283.787l-.87.036A5.636 5.636 0 0010 4.818c-3.038 0-5.5 2.415-5.5 5.394 0 2.906 2.344 5.276 5.279 5.39l.221.004.221-.004c2.935-.114 5.279-2.484 5.279-5.39l-.003-.13.082-.215c.2-.524.676-.893 1.234-.967l.058-.005a6.771 6.771 0 01-.803 4.742 2.849 2.849 0 012.076.657l.157.143 1.872 1.836a2.731 2.731 0 010 3.916 2.864 2.864 0 01-3.852.13l-.14-.13-1.872-1.836a2.732 2.732 0 01-.818-2.19 7.062 7.062 0 01-3.491.914c-3.866 0-7-3.073-7-6.865 0-3.791 3.134-6.865 7-6.865zm5.37 12.13a1.28 1.28 0 00-.097 1.73l.096.106 1.872 1.836c.241.236.552.362.868.378h.135l.135-.013c.269-.04.527-.162.733-.365a1.28 1.28 0 00.097-1.73l-.097-.106-1.871-1.835a1.342 1.342 0 00-1.872 0zm.05-12.056l.044 1.013a2.493 2.493 0 001.648 2.225l.97.355c.457.167.35.83-.138.85l-1.033.044a2.592 2.592 0 00-.304.03l-.05.01c-.08.014-.159.032-.236.054l-.147.046-.18.07-.168.08-.113.063-.141.09-.164.121-.032.026c-.323.27-.579.62-.734 1.026l-.361.95a.43.43 0 01-.373.285h-.078l-.077-.012a.429.429 0 01-.34-.407l-.044-1.014a2.493 2.493 0 00-1.648-2.224l-.97-.355c-.457-.167-.35-.83.138-.85l1.034-.044c.3-.013.588-.077.855-.185l.109-.048c.175-.08.34-.178.49-.294l.148-.122.12-.114.136-.152.045-.056.078-.104.055-.082-.03.046a2.47 2.47 0 00.262-.505l.362-.95c.17-.45.846-.345.867.134z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
                <span className="hidden md:inline text-sm text-muted-foreground">
                  Search
                </span>
              </div>
              <div className="hidden md:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted text-muted-foreground rounded border border-border">
                  Ctrl
                </kbd>
                <span className="text-xs text-muted-foreground">+</span>
                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted text-muted-foreground rounded border border-border">
                  K
                </kbd>
              </div>
            </button>
            <Link
              href="https://www.linkedin.com/in/codernazmulhossain/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-secondary hover:bg-accent transition-colors duration-200"
              aria-label="Linkedin"
            >
              <Linkedin className="h-4 w-4 fill-foreground" />
            </Link>
            <GitHubStarBadge repo="olovalabs/olovaui" />
            <ThemeSwitcher />
          </nav>
        </header>
      </div>

      {searchOpen ? (
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      ) : null}
    </>
  );
};

export default Header;

