import { motion } from 'motion/react';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface RollingLettersProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  smokey?: boolean;
}

const RollingLetters = ({
  children,
  delay = 50,
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
  smokey = true
}: RollingLettersProps) => {
  const text = typeof children === 'string' ? children : '';
  const letters = text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <p ref={ref} className={`${className} flex flex-wrap gap-0 leading-normal overflow-hidden`}>
      {letters.map((letter, index) => (
        <motion.span
          className="inline-block"
          key={index}
          initial={{
            y: '100%',
            opacity: 0,
            filter: smokey ? 'blur(10px)' : 'none',
            scale: smokey ? 1.5 : 1
          }}
          animate={inView ? {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1
          } : {
            y: '100%',
            opacity: 0,
            filter: smokey ? 'blur(10px)' : 'none',
            scale: smokey ? 1.5 : 1
          }}
          transition={{
            duration: smokey ? 0.8 : 0.5,
            delay: (index * delay) / 1000,
            ease: [0.33, 1, 0.68, 1]
          }}
          onAnimationComplete={
            index === letters.length - 1 ? onAnimationComplete : undefined
          }
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </p>
  );
};

export { RollingLetters };
export type { RollingLettersProps };
