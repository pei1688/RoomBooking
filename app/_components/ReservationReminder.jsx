"use client";

import { format } from "date-fns";
import { useReservation } from "./context/ReservationContext";
import { X } from "lucide-react";

function ReservationReminder() {
  const { range, reSetRange } = useReservation();

  if (!range?.from || !range?.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-4 px-9 rounded-full bg-boshe-200 opacity-90 text-stone-100 text  font-semibold shadow-xl flex gap-8 items-center">
      <p>
        <span>👋</span> 不要忘記您的預訂 <br /> 從{" "}
        {format(new Date(range?.from), "MMM dd yyyy")} 至{" "}
        {format(new Date(range?.to), "MMM dd yyyy")}
      </p>
      <button
        onClick={reSetRange}
        className="rounded-md p-1 hover:border-gray-100 hover:border  duration-200 hover:bg-boshe-300"
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default ReservationReminder;
