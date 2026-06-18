import dynamic from "next/dynamic";
import Header from "@/components/layout/header";
import { Hero } from "./components/hero";


// Dynamic imports for components below the fold to reduce initial TBT


const ComponentShowcase = dynamic(
  () => import("./components/component-showcase").then((mod) => mod.ComponentShowcase),
  { loading: () => <div className="h-[600px] animate-pulse bg-muted/20" /> }
);







const Footer = dynamic(() =>
  import("./components/footer").then((mod) => mod.Footer)
);

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="overflow-hidden">
        {/* Above-the-fold: SSR'd for optimal LCP */}
        <Hero />
        {/* Below-the-fold: client-only, deferred for TBT reduction */}
      
        <ComponentShowcase />
       
       
      </main>
      <Footer />
    </div>
  );
}
