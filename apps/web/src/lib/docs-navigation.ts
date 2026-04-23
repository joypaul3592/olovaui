import { navigation } from "@/constants/navigation";

export type DocPage = {
  label: string;
  href: string;
};

export function getAllDocPages(): DocPage[] {
  const pages: DocPage[] = [];
  
  navigation.forEach((section) => {
    section.children.forEach((child) => {
      pages.push({
        label: child.label,
        href: child.href,
      });
    });
  });
  
  return pages;
}

export function getAdjacentPages(currentPath: string): {
  previous: DocPage | null;
  next: DocPage | null;
} {
  const pages = getAllDocPages();
  const normalizedPath = currentPath.endsWith('/') && currentPath !== '/' 
    ? currentPath.slice(0, -1) 
    : currentPath;
  
  const currentIndex = pages.findIndex((page) => page.href === normalizedPath);
  
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }
  
  return {
    previous: currentIndex > 0 ? pages[currentIndex - 1] : null,
    next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null,
  };
}
