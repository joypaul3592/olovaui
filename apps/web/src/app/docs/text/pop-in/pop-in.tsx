import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface PopInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'characters';
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

const PopIn = ({
  children,
  delay = 100,
  className = '',
  animateBy = 'words',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete
}: PopInProps) => {
  const text = typeof children === 'string' ? children : '';
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(!prefersReducedMotion); // Don't animate if prefers reduced motion
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, prefersReducedMotion]);

  return (
    <p ref={ref} className={`${className} flex flex-wrap gap-0 leading-normal`}>
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block"
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            delay: prefersReducedMotion ? 0 : (index * delay) / 1000,
            ease: prefersReducedMotion ? "linear" : [0.34, 1.56, 0.64, 1]
          }}
          onAnimationComplete={
            index === elements.length - 1 ? onAnimationComplete : undefined
          }
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
};

export { PopIn };
export type { PopInProps };
