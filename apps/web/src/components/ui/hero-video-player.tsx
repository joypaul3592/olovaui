"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';

interface HeroVideoDialogProps {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  title?: string;
  className?: string;
}

export const HeroVideoDialog = ({ 
  videoSrc, 
  thumbnailSrc, 
  thumbnailAlt = "Video thumbnail",
  title = "Play Video",
  className = ""
}: HeroVideoDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  return (
    <div className={`relative w-full max-w-5xl mx-auto ${className}`}>
      {/* Video Trigger / Thumbnail */}
      <div 
        className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-slate-900 aspect-video transition-all duration-500 hover:shadow-indigo-500/25"
        onClick={openModal}
        role="button"
        aria-label={title}
        tabIndex={0}
      >
        {/* Thumbnail Image */}
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

        {/* Animated Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Outer glowing pulse ring */}
            <div className="absolute w-24 h-24 bg-indigo-500/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Glassmorphism Button */}
            <div className="relative z-10 w-20 h-20 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-xl transition-transform duration-300 group-hover:scale-110">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-indigo-600 shadow-inner">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Dialog */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm"
          onClick={handleBackdropClick}
          style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
        >
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 transform scale-95 opacity-0"
            style={{ animation: 'zoomIn 0.3s ease-out 0.1s forwards' }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Player (Iframe) */}
            <iframe
              className="w-full h-full"
              src={`${videoSrc}?autoplay=1&rel=0`}
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Inline Keyframe Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </div>
  );
};
