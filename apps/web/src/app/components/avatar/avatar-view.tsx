"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const avatars = [
  {
    name: "Olova UI",
    image: "https://olova.net/img/olova.png",
    initials: "OU",
  },
  {
    name: "Nova Hart",
    image: "",
    initials: "NH",
  },
];

export function AvatarView() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6">
      {avatars.map((person) => (
        <Avatar key={person.name} size="lg" className="ring-2 ring-border/60">
          <AvatarImage src={person.image} alt={person.name} />
          <AvatarFallback>{person.initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

export function AvatarSizesView() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6">
      <Avatar size="sm" className="ring-2 ring-border/60">
        <AvatarImage src="https://olova.net/img/olova.png" alt="Olova UI" />
        <AvatarFallback className="text-xs">OU</AvatarFallback>
      </Avatar>
      <Avatar size="md" className="ring-2 ring-border/60">
        <AvatarImage src="https://olova.net/img/olova.png" alt="Olova UI" />
        <AvatarFallback className="text-sm">OU</AvatarFallback>
      </Avatar>
      <Avatar size="lg" className="ring-2 ring-border/60">
        <AvatarImage src="https://olova.net/img/olova.png" alt="Olova UI" />
        <AvatarFallback className="text-base">OU</AvatarFallback>
      </Avatar>
      <Avatar size="xl" className="ring-2 ring-border/60">
        <AvatarImage src="https://olova.net/img/olova.png" alt="Olova UI" />
        <AvatarFallback className="text-lg">OU</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default AvatarView;
