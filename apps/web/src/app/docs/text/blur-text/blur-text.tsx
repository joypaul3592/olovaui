import { motion, Transition, Easing, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, useMemo, ReactNode } from 'react';

type AnimationSnapshot = Record<string, string | number>;

type AnimateBy = 'words' | 'characters';
type Direction = 'top' | 'bottom';

interface BlurTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animateBy?: AnimateBy;
  direction?: Direction;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: Easing;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

const buildKeyframes = (
  from: AnimationSnapshot,
  steps: AnimationSnapshot[]
): Record<string, (string | number)[]> => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap(s => Object.keys(s))
  ]);

  const keyframes: Record<string, (string | number)[]> = {};

  keys.forEach(k => {
    const values = [from[k], ...steps.map(s => s[k])].filter((v): v is string | number => v !== undefined);
    if (values.length > 0) {
      keyframes[k] = values;
    }
  });

  return keyframes;
};

const BlurText = ({
  children,
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35
}: BlurTextProps) => {
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

  const defaultFrom: AnimationSnapshot = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(8px)', opacity: 0, y: -30 }
        : { filter: 'blur(8px)', opacity: 0, y: 30 },
    [direction]
  );

  const defaultTo: AnimationSnapshot[] = useMemo(
    () => [
      {
        filter: 'blur(4px)',
        opacity: 0.5,
        y: direction === 'top' ? 3 : -3
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from(
    { length: stepCount },
    (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1))
  );

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap gap-0 leading-normal`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: prefersReducedMotion ? 0 : totalDuration,
          times: prefersReducedMotion ? [0, 1] : times,
          delay: prefersReducedMotion ? 0 : (index * delay) / 1000,
          ease: prefersReducedMotion ? "linear" : easing
        };

        return (
          <motion.span
            className="inline-block"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
            style={{ willChange: inView ? 'transform, filter, opacity' : 'auto' }}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export { BlurText };
export type { BlurTextProps, AnimationSnapshot, AnimateBy, Direction };
