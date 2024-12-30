import { Suspense } from "react";
import RoomList from "../_components/room/RoomList";
import { getBookedDates, getRooms } from "@/_lib/data-service";

import ReservationReminder from "../_components/ReservationReminder";
import Filter from "../_components/Filter/Filter";
import FormSpinner from "../_components/spinner/FormSpinner";
import ElevatorButton from "../_components/ElevatorButton";

export const metadata = { title: "房間列表" };

//轉成靜態路由預先獲取數據
export async function generateStaticParams() {
  const rooms = await getRooms();
  const ids = rooms.map((room) => ({
    roomId: String(room.id),
  }));
  return ids;
}

async function page({ searchParams }) {
  const rooms = await getRooms();
  
  const filterCapacity = searchParams?.capacity ?? "all";
  const filterDiscount = searchParams?.discount ?? "all";

  return (
    <div className="relative">
      <ElevatorButton />
      <div className="flex flex-col ">
        <Suspense
          fallback={<FormSpinner />}
          key={`${filterCapacity}-${filterDiscount}`}
        >
          <div className="flex justify-end items-center">
            <Filter />
          </div>

          <RoomList
            rooms={rooms}
            filterCapacity={filterCapacity}
            filterDiscount={filterDiscount}
          />
          <ReservationReminder />
        </Suspense>
      </div>
    </div>
  );
}

export default page;

// switch (filter) {
//   case "all":
//     displayRooms = rooms;
//     break;
//   case "small":
//     displayRooms = rooms.filter((room) => room.maxCapacity <= 3);
//     break;
//   case "medium":
//     displayRooms = rooms.filter(
//       (room) => room.maxCapacity >= 4 && room.maxCapacity <= 7
//     );
//     break;
//   case "large":
//     displayRooms = rooms.filter((room) => room.maxCapacity >= 7);
//     break;
//   default:
//     displayRooms = rooms;
//     break;
// }
