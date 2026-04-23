'use client';
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface AnimationProps {
  children: ReactNode;
  slideInView?: boolean;
  className?: string;
  delay?: number;
  charByChar?: boolean;
}

const Animation = ({ 
  children, 
  slideInView = false, 
  className = "",
  delay = 0,
  charByChar = true
}: AnimationProps) => {
  const text = typeof children === 'string' ? children : String(children);
  const prefersReducedMotion = useReducedMotion();

  if (slideInView && charByChar) {
    const words = text.split(' ');
    
    return (
      <motion.h2 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : delay }}
        className={`text-2xl md:text-4xl lg:text-5xl font-bold ${className}`}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-3 md:mr-4">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                initial={{ 
                  y: prefersReducedMotion ? 0 : 100,
                  opacity: 0,
                  rotateX: prefersReducedMotion ? 0 : -90,
                  scale: prefersReducedMotion ? 1 : 0.5
                }}
                animate={{ 
                  y: 0,
                  opacity: 1,
                  rotateX: 0,
                  scale: 1
                }}
                transition={{ 
                  delay: prefersReducedMotion ? 0 : delay + (wordIndex * 0.08) + (charIndex * 0.03),
                  duration: prefersReducedMotion ? 0 : 0.6,
                  ease: prefersReducedMotion ? "linear" : [0.25, 0.46, 0.45, 0.94],
                  type: prefersReducedMotion ? false : "spring",
                  stiffness: prefersReducedMotion ? undefined : 100,
                  damping: prefersReducedMotion ? undefined : 12
                }}
                whileHover={{
                  scale: 1.2,
                  color: "#3b82f6",
                  transition: { duration: 0.2 }
                }}
                className="inline-block origin-bottom"
                style={{ 
                  transformPerspective: 1000,
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h2>
    );
  }

  if (slideInView && !charByChar) {
    return (
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReducedMotion ? 0 : delay, duration: prefersReducedMotion ? 0 : 0.8 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
  
  return <div className={className}>{children}</div>;
};
export default Animation;
