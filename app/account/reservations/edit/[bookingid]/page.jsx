import { getBooking, getRoom } from "@/_lib/data-service";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { RiErrorWarningLine } from "react-icons/ri";
import UpdateBookingForm from "@/app/_components/UpdateBookingForm";
import { Suspense } from "react";
import FormSpinner from "@/app/_components/spinner/FormSpinner";

async function page({ params }) {
  const { bookingid } = params;
  const {
    numGuest,
    description,
    roomid,
    numNight,
    startDate,
    endDate,
    has_breakfast,
  } = await getBooking(bookingid);
  const { maxCapacity, name } = await getRoom(roomid);
  const hasBreakfast = has_breakfast === true ? "需要" : "不需要";

  return (
    <div className="flex flex-col">
      <div className="text-xl mb-5 font-semibold flex justify-between items-center -tracking-tighter text-boshe-100">
        更新預訂 : #{name}
        <Button variant="back" size="lg" className="self-end">
          <Link href={"/account/reservations"}>返回</Link>
        </Button>
      </div>

      <div className="bg-boshe-400 flex flex-col justify-center items-center p-5 rounded-lg shadow-xl">
        <h2 className="text-boshe-100 my-5 flex flex-col items-center gap-2 justify-between w-full ">
          <div className="flex -tracking-tighter text-sm">
            入住時間為 <p className="underline text-orange-300">{startDate}</p>{" "}
            ~<p className="underline text-orange-300">{endDate}</p> 共
            <p className="underline text-orange-300">{numNight}</p> 晚
          </div>
        </h2>
        <hr className="border border-t-boshe-400 w-full mb-5" />

        <p className="text-accent-300 text-sm -tracking-tighter flex gap-1 items-center">
          <RiErrorWarningLine size={18} />
          麻煩請確定好後再做更改避免不必要的手續 (入住前7天將無法更改)
        </p>
        <Suspense fallback={<FormSpinner />}>
          <UpdateBookingForm
            hasBreakfast={hasBreakfast}
            maxCapacity={maxCapacity}
            numGuest={numGuest}
            description={description}
            bookingid={bookingid}
            has_breakfast={has_breakfast}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
