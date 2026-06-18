import { useState, useEffect } from 'react';
import { motion, useTransform, useSpring, useVelocity, useMotionValue } from 'framer-motion';

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const CAROUSEL_DATA = [
  {
    id: 1,
    title: 'SERIES 001',
    location: 'ARCHIVE',
    year: '2024',
    img: 'https://i.pinimg.com/736x/6e/5f/0b/6e5f0bfc38af5d101a25de95af7f1e37.jpg'
  },
  {
    id: 2,
    title: 'SERIES 002',
    location: 'ARCHIVE',
    year: '2024',
    img: 'https://i.pinimg.com/736x/2a/94/f0/2a94f02908bd2e472a69d10dacc6de3f.jpg'
  },
  {
    id: 3,
    title: 'SERIES 003',
    location: 'ARCHIVE',
    year: '2024',
    img: 'https://i.pinimg.com/control1/736x/5b/a1/81/5ba181ef8090b92f8a10b4806bd38665.jpg'
  },
  {
    id: 4,
    title: 'SERIES 004',
    location: 'ARCHIVE',
    year: '2024',
    img: 'https://i.pinimg.com/control1/1200x/6d/f3/af/6df3af3e888defb6f8ae1d59ea109919.jpg'
  },
  {
    id: 5,
    title: 'SERIES 005',
    location: 'ARCHIVE',
    year: '2024',
    img: 'https://i.pinimg.com/736x/b1/58/6b/b1586b4b1703510c1ba215d6a700ea0a.jpg'
  },
  {
    id: 6,
    title: 'SERIES 006',
    location: 'ARCHIVE',
    year: '2024',
    img: 'https://i.pinimg.com/736x/43/17/a5/4317a5c6e1817f5c6e43b61259599513.jpg'
  },
  {
    id: 7,
    title: 'SERIES 007',
    location: 'ARCHIVE',
    year: '2024',
    img: 'https://i.pinimg.com/736x/32/68/be/3268beb90a06cec45b4d474f31158089.jpg'
  },
  {
    id: 8,
    title: 'SERIES 008',
    location: 'ARCHIVE',
    year: '2024',
    img: 'https://i.pinimg.com/control1/736x/4b/e9/e8/4be9e8860253638b2d52cbf21ed50668.jpg'
  },
  {
    id: 9,
    title: 'SERIES 009',
    location: 'ARCHIVE',
    year: '2024',
    img: 'https://i.pinimg.com/736x/3f/0e/82/3f0e8265d6f1de98e513707e9056f5d8.jpg'
  },
  {
    id: 10,
    title: 'SERIES 010',
    location: 'ARCHIVE',
    year: '2024',
    img: 'https://i.pinimg.com/736x/64/a6/6d/64a66d6625070a6a93f6d35492dcda36.jpg'
  },
  {
    id: 11,
    title: 'SERIES 011',
    location: 'ARCHIVE',
    year: '2024',
    img: 'https://i.pinimg.com/736x/94/0e/14/940e145145cb7f76aed0d93e354f00e2.jpg'
  }
];

export default function MomentumCarousel() {
  const [dimensions, setDimensions] = useState({ cardWidth: 320, gap: 16 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        cardWidth: window.innerWidth < 768 ? 260 : 320,
        gap: 16
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const trackX = useMotionValue(0);

  const velocity = useVelocity(trackX);
  const smoothVelocity = useSpring(velocity, { damping: 40, stiffness: 300, mass: 0.8 });
  const skewX = useTransform(smoothVelocity, [-1000, 0, 1000], [-8, 0, 8], { clamp: false });
  const scale = useTransform(smoothVelocity, [-1000, 0, 1000], [0.95, 1, 0.95], { clamp: false });
  const rotateY = useTransform(smoothVelocity, [-1000, 0, 1000], [15, 0, -15], { clamp: false });

  const INFINITE_DATA = [
    ...CAROUSEL_DATA.map(item => ({ ...item, uid: `${item.id}-1` })),
    ...CAROUSEL_DATA.map(item => ({ ...item, uid: `${item.id}-2` })),
    ...CAROUSEL_DATA.map(item => ({ ...item, uid: `${item.id}-3` }))
  ];

  const itemWidth = dimensions.cardWidth + dimensions.gap;
  const totalWidth = itemWidth * INFINITE_DATA.length;

  return (
    <div 
      className="h-screen w-full overflow-hidden flex flex-col items-center justify-center relative select-none font-sans text-stone-800"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        drag="x"
        dragTransition={{
          power: 0.3,
          timeConstant: 300,
          modifyTarget: (target) => Math.round(target / itemWidth) * itemWidth,
        }}
        style={{ x: trackX, gap: `${dimensions.gap}px` }}
        className="flex items-center cursor-grab active:cursor-grabbing w-max"
      >
        {INFINITE_DATA.map((item, index) => (
          <Card
            key={item.uid}
            item={item}
            index={index}
            originalIndex={index % CAROUSEL_DATA.length}
            trackX={trackX}
            skewX={skewX}
            scale={scale}
            rotateY={rotateY}
            cardWidth={dimensions.cardWidth}
            itemWidth={itemWidth}
            totalWidth={totalWidth}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Card({ item, index, originalIndex, trackX, skewX, scale, rotateY, cardWidth, itemWidth, totalWidth }: any) {
  const [isHovered, setIsHovered] = useState(false);

  const x = useTransform(trackX, (latestTrackX: number) => {
    const absoluteX = latestTrackX + index * itemWidth;
    const wrappedX = wrap(-itemWidth, totalWidth - itemWidth, absoluteX);
    return wrappedX - absoluteX;
  });

  const formattedIndex = String(originalIndex + 1).padStart(3, '0');

  return (
    <motion.div
      style={{ x, skewX, scale, rotateY, width: cardWidth }}
      className="relative flex flex-col items-center shrink-0 group origin-bottom"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute -top-12 text-sm tracking-widest text-stone-500 font-medium"
      >
        {formattedIndex}
      </motion.div>

      <div className="w-full h-[360px] md:h-[440px] rounded-[32px] overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] relative">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          draggable={false}
        />
        <div className={`absolute inset-0 bg-black/10 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute -bottom-14 text-[10px] tracking-[0.15em] text-stone-500 uppercase flex items-center gap-3 whitespace-nowrap"
      >
        <span className="text-stone-800 font-medium">{item.title}</span>
        <span className="text-stone-300">|</span>
        <span>{item.location}</span>
        <span className="text-stone-300">|</span>
        <span>{item.year}</span>
      </motion.div>
    </motion.div>
  );
}
