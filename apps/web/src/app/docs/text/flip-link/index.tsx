"use client"

import { FlipLink } from './flip-link';

export function FlipLinkView() {
  return (
      <section className="relative z-10 grid place-content-center gap-4 px-6 py-24 md:gap-8">
        <FlipLink href="#" hoverColor="hover:text-rose-500">
          Projects
        </FlipLink>
        <FlipLink href="#" hoverColor="hover:text-emerald-400">
          About Me
        </FlipLink>
        <FlipLink href="#" hoverColor="hover:text-indigo-400">
          Services
        </FlipLink>
        <FlipLink href="#" hoverColor="hover:text-amber-400">
          Contact
        </FlipLink>
      </section>
  );
}

export default FlipLinkView;
