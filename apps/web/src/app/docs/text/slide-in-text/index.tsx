"use client"

import Animation from './slide-in-text';

export function SlideInView() {
    return (
      <div className='text-center'>
        <Animation slideInView>
          Simplicity is the ultimate sophistication.
        </Animation>
        
        <Animation 
          slideInView 
          charByChar={false}
          className="mt-8 text-gray-600 text-sm md:text-base"
          delay={1}
        >
          — Leonardo da Vinci
        </Animation>
      </div>
    );
  }
