"use client";
import { deleteBooking } from "@/action/booking";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  //⭐optimisticBookings: 保存了當前狀態的 bookings 列表，並進行樂觀更新後的展示。

  //⭐optimisticDelete: 當刪除某個預訂時，會立即從 curBookings 中過濾掉該預訂，從而使 UI 看起來已刪除。
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          key={booking.id}
          booking={booking}
          onDelete={handleDelete}
          optimisticDelete={optimisticDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
