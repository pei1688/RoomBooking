import { Mountain } from "lucide-react";
import Link from "next/link";

function Logo() {
  return (
    <Link href={"/"} className="z-10 ">
      <div className="flex justify-center items-center gap-3 py-3">
        <Mountain size={40} />

        <span className="text-xl   font-semibold">
          RoomBooking
        </span>
      </div>
    </Link>
  );
}

export default Logo;
