"use client"

import { Carousel3D, Carousel3DCard } from './3d-carousel';

const EXAMPLE_CARDS: Carousel3DCard[] = [
  {
    id: "c1",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    glowColor: "rgba(148, 163, 184, 0.4)",
  },
  {
    id: "c2",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    glowColor: "rgba(99, 102, 241, 0.5)",
  },
  {
    id: "c3",
    imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
    glowColor: "rgba(239, 68, 68, 0.4)",
  },
  {
    id: "c4",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: "c5",
    imageUrl: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
];

export function Carousel3DView() {
    return (
        <div className='w-full'>
            <Carousel3D 
              cards={EXAMPLE_CARDS} 
              containerHeight={600} 
              className="bg-black/95 rounded-2xl"
            />
        </div>
    );
}

export default Carousel3DView;
