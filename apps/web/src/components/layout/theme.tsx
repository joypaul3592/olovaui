"use client";
import { useTheme } from "@/context/theme-context";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted && theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center rounded-md p-2 text-sm transition-colors text-foreground cursor-pointer"
      aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
    >
      {mounted ? (isDark ? <Sun size={16} /> : <Moon size={16} />) : null}
    </button>
  );
};
