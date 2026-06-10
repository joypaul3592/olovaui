import Header from '@/components/layout/header';
import { Hero } from './components/hero';

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-white dark:bg-[#030403] text-neutral-900 dark:text-white selection:bg-green-500/30 font-sans">
      <Header />
      {/* In a real project, these styles would go in index.css or tailwind.config.js. 
         Included here for single-file portability as requested.
      */}
      <style>{`
        /* Custom Grid Pattern */
        .card-grid {
            background-size: 40px 40px;
            background-image:
                linear-gradient(to right, rgba(74, 222, 128, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(74, 222, 128, 0.05) 1px, transparent 1px);
            mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }

        /* Animations */
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-float-delayed { animation: float 12s ease-in-out infinite; animation-delay: 2s; }
        
        /* Fade in for the glow */
        @keyframes glow-fade {
          from { opacity: 0; transform: translate(-50%, -60%) scale(0.8); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .animate-glow {
          animation: glow-fade 1.5s ease-out forwards;
        }
      `}</style>

      {/* --- New Soft Ambient Glow (Pure CSS) --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none z-0">
        {/* Main diffusion layer */}
        <div className="absolute top-[-350px] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[#00BF63]/20 blur-[120px] rounded-[100%] animate-glow" />
        {/* Inner brighter core for depth */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00BF63]/10 blur-[80px] rounded-[100%] animate-glow" style={{ animationDelay: '0.2s' }} />
      </div>

      {/* --- Background Decorative Elements (Wireframes) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cube Left */}
        <svg className="absolute top-20 -left-20 w-96 h-96 text-green-900/10 animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <path d="M3.27 6.96 12 12.01l8.73-5.05"></path>
          <path d="M12 22.08V12"></path>
        </svg>

        {/* Triangle/Shape Right */}
        <svg className="absolute top-40 -right-20 w-80 h-80 text-green-900/10 animate-float-delayed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M12 2L2 22h20L12 2z" />
        </svg>
      </div>

      {/* --- Main Content --- */}
      <Hero />




    </div>
  );
}
