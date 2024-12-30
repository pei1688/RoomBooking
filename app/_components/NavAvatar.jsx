"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NavAvatar({ guest, user }) {
  return (
    <Avatar>
      <AvatarImage src={user.image} alt="@shadcn" />
      <AvatarFallback className="bg-zinc-800 tracking-[1px]">
        {guest.fullName.slice(0, 3)}
      </AvatarFallback>
    </Avatar>
  );
}
