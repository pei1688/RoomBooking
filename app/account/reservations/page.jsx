import { getBookings } from "@/_lib/data-service";
import ReservationList from "@/app/_components/reservations/ReservationList";
import FormSpinner from "@/app/_components/spinner/FormSpinner";
import { Button } from "@/app/_components/ui/button";
import { auth } from "@/auth";
import Link from "next/link";
import { Suspense } from "react";

async function page() {
  const session = await auth();
  const bookings = await getBookings(session?.user?.id);
  
  return (
    <div className=" md:mx-4">
      {bookings.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[500px] bg-boshe-400 rounded-lg shadow-lg text-boshe-100">
          <h2 className="text-3xl font-semibold">您還尚未有預訂</h2>
          <br />
          <Button variant="secondary">
            <Link href={"/room"}>立即預訂</Link>
          </Button>
        </div>
      ) : (
        <Suspense fallback={<FormSpinner />}>
          <ReservationList bookings={bookings} />
        </Suspense>
      )}
    </div>
  );
}

export default page;
