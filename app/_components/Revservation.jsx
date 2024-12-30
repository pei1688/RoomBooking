"use client";
import DateSelector from "./DateSelector";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { differenceInDays, isWithinInterval } from "date-fns";
import { useReservation } from "./context/ReservationContext";
import { createBooking } from "@/action/booking";
import { toast } from "sonner";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function Revservation({ room, bookedDates, user }) {
  const { id, name, maxCapacity, regularPrice, discount, available } = room;
  const { range = {}, setRange, reSetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  const numNight =
    range.from && range.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const roomPrice = numNight * (regularPrice - discount);
  const startDate = range.from;
  const endDate = range.to;

  const bookingData = {
    startDate,
    endDate,
    numNight,
    total_price: roomPrice,
    roomid: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);
  
  async function createBookingAction(formData) {
    const result = await createBookingWithData(formData);
    if (result?.error) {
      toast.error(result.error);
    } else toast.success("預訂成功，感謝您的預訂");
  }

  return (
    <form
      action={async (formData) => {
        await createBookingAction(formData);
        reSetRange()
      }}
      className="text-stone-100 shadow-2xl space-y-3 p-3 justify-center border-boshe-200 flex flex-col h-auto rounded-xl"
    >
    

      {/* 人數選擇 */}
      <div className="space-y-3">
        <Label className="pb-3" htmlFor="numGuests">
          選擇人數
        </Label>
        <Select openDirection="down" name="numGuest" id="numGuest">
          <SelectTrigger className="w-full   text-boshe-400  text-opacity-60">
            <SelectValue placeholder="選擇人數" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectLabel className="text-boshe-400">請選擇人數</SelectLabel>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <SelectItem
                  value={x.toString()}
                  key={x}
                  className="cursor-pointer"
                >
                  {x} 人
                </SelectItem>
              ))}
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>

      {/* 早餐選擇 */}
      <div className=" space-y-3">
        <Label className="pb-3" htmlFor="hasBreakfast">
          選擇是否需要早餐
        </Label>
        <Select openDirection="down" name="hasBreakfast" id="hasBreakfast">
          <SelectTrigger className="w-full text-boshe-400 text-opacity-60">
            <SelectValue placeholder="是否需要早餐" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectLabel className="text-boshe-400">
                選擇是否需要早餐
              </SelectLabel>
              <SelectItem value="要" key="要" className="cursor-pointer">
                需要
              </SelectItem>
              <SelectItem value="不要" key="不要" className="cursor-pointer">
                不需要
              </SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>

      {/* 日期選擇 */}
      <div>
        <DateSelector
          room={room}
          bookedDates={bookedDates}
          range={range}
          setRange={setRange}
          reSetRange={reSetRange}
          roomPrice={roomPrice}
          numNight={numNight}
          displayRange={displayRange}
        />
      </div>

      {/* 備註 */}
      <div className="space-y-3">
        <Label htmlFor="description">備註</Label>
        <Input
          type="text"
          placeholder="ex.早餐是否為素食..."
          name="description"
          id="description"
        />
      </div>

      {/* available hidden field */}
      <div>
        <Input type="hidden" value={available} />
      </div>
      <button className="w-full duration-200 hover:bg-zinc-600 py-1 rounded-lg bg-zinc-500">
        立即預訂
      </button>
      {discount > 0 && (
        <h1 className="text-stone-100 self-center  text-xl">
          折扣${discount}TWD
        </h1>
      )}
      {numNight > 0 && (
        <div className="flex justify-between pt-5">
          <h1 className="text-stone-100 self-end  text-md">
            ${regularPrice}TWD x {numNight} / 晚
          </h1>
          <h1 className="text-stone-100 self-center  text-md">
            ${roomPrice}TWD
          </h1>
        </div>
      )}
    </form>
  );
}

export default Revservation;
