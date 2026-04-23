"use client"

import { RotatingCards, RotatingCard } from './rotating-cards';

const BASE_CARDS: RotatingCard[] = [
    {
      id: 1,
      content: "1",
      img: "https://i.pinimg.com/1200x/5a/b9/94/5ab9944f849c62246e92e378cb91ab76.jpg",
    },
    {
      id: 2,
      content: "2",
      img: "https://i.pinimg.com/736x/57/5a/ed/575aedeba6783f7ee729ffb27fb708aa.jpg",
    },
    {
      id: 3,
      content: "3",
      img: "https://i.pinimg.com/736x/53/ae/15/53ae15903bc6e5a41bbea4d4efbd756f.jpg",
    },
    {
      id: 4,
      content: "4",
      img: "https://i.pinimg.com/736x/0a/ab/0e/0aab0ed4233a107b7f2aa2e5ad00b245.jpg",
    },
    {
      id: 5,
      content: "5",
      img: "https://i.pinimg.com/736x/9e/42/54/9e42540b1bbe9da6af27ee861978c0ea.jpg",
    },
    {
      id: 6,
      content: "6",
      img: "https://i.pinimg.com/736x/a7/93/0b/a7930b2a627a670df3ce977998733d7a.jpg",
    },
    {
      id: 7,
      content: "7",
      img: "https://i.pinimg.com/736x/79/a7/ab/79a7ab00ac9157b93b45486c83a847d9.jpg",
    },
    {
      id: 8,
      content: "8",
      img: "https://i.pinimg.com/736x/14/60/a3/1460a32885d108cff097cffeb3a8f352.jpg",
    },
    {
      id: 9,
      content: "9",
      img: "https://i.pinimg.com/736x/77/4b/92/774b9270b231fbe3db6ffc7c4162bd6e.jpg",
    },
];

const CARDS_DATA: RotatingCard[] = [
    ...BASE_CARDS,
    ...BASE_CARDS.map((c) => ({
      ...c,
      id: (typeof c.id === 'number' ? c.id + 9 : `${c.id}-2`),
      content: typeof c.content === 'string' ? String(Number(c.content) + 9) : c.content,
    })),
    ...BASE_CARDS.map((c) => ({
      ...c,
      id: (typeof c.id === 'number' ? c.id + 18 : `${c.id}-3`),
      content: typeof c.content === 'string' ? String(Number(c.content) + 18) : c.content,
    })),
];

export function RotatingCardsView() {
    return (
        <div className="relative h-[600px] w-full flex justify-center items-center overflow-hidden  rounded-2xl border border-white/5">
            <div
                className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[80vw] h-[400px] rounded-full pointer-events-none z-0 opacity-20"
                style={{
                    background:
                    "radial-gradient(ellipse at top, rgba(255,255,255,0.15) 0%, transparent 60%)",
                }}
            />

            <RotatingCards
                cards={CARDS_DATA}
                radius={750}
                duration={60}
                cardWidth={200}
                cardHeight={280}
                draggable={true}
                mouseWheel={true}
                pauseOnHover={true}
                autoPlay={true}
                className="w-full h-full z-10"
                centerClassName="bottom-[-500px] left-1/2"
            />
        </div>
    );
}

export default RotatingCardsView;
