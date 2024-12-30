"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { useReservation } from "./context/ReservationContext";
import { format } from "date-fns";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

export default function DateSelector({ room, bookedDates }) {
  const { range = {}, setRange, reSetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = room;
  const numNights =
    range.from && range.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const roomPrice = numNights * (regularPrice - discount);

  return (
    <div className={cn("grid gap-2 ")}>
      <h1 className="text-sm">選取日期</h1>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal "
              //   !date && "text-muted-foreground "
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 " />
            {range?.from ? (
              range.to ? (
                <>
                  {format(range.from, "LLL dd, y")} -{" "}
                  {format(range.to, "LLL dd, y")}
                </>
              ) : (
                format(range.from, "LLL dd, y")
              )
            ) : (
              <span>選取預訂取日期</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            min={2}
            max={7}
            initialFocus
            fromMonth={new Date()}
            fromDate={new Date()}
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            disabled={(curDate) => {
              const isBooked = bookedDates.some(
                (date) => isSameDay(new Date(date), curDate) // 確保轉換為日期物件進行比對
              );
              return isPast(curDate) || isBooked; // 過濾過去日期和已預訂日期
            }}
          />
          {range?.from || range?.to ? (
            <button
              onClick={reSetRange}
              className="text-gray-900 mb-1 -tracking-tighter text-md flex w-full justify-end pr-[12px]"
            >
              <span className="hover:bg-gray-100 px-2 py-1 rounded-xl border border-gray-400">
                清除日期
              </span>
            </button>
          ) : (
            <div className="h-[38px]"></div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
