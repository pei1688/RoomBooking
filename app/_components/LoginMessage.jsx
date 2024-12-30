"use client";
import Link from "next/link";
import { Calendar } from "./ui/calendar";
import { isPast, isSameDay } from "date-fns";

function LoginMessage({ bookedDates }) {
  return (
    <div className="flex justify-center items-center w-[400px] border h-full rounded-lg border-boshe-300 flex-col">
      <div className=" text-zinc-100  rounded-md ">
        <Calendar
          disabled={(curDate) => {
            const isBooked = bookedDates.some((date) =>
              isSameDay(new Date(date), curDate)
            );
            return isPast(curDate) || isBooked;
          }}
        />
        <p className="text-center text-lg py-5 text-stone-100">
          請{" "}
          <Link
            href="/login"
            className="underline text-zinc-200 hover:text-zinc-300 duration-200"
          >
            登入
          </Link>{" "}
          開始您的預訂
        </p>
      </div>
    </div>
  );
}

export default LoginMessage;
