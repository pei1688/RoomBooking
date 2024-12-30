import RoomCard from "./RoomCard";

// export const revalidate = 0
async function RoomList({
  rooms,
  filterCapacity,
  filterDiscount,
}) {
  let displayRooms;
  if (filterCapacity === "all") {
    displayRooms = rooms;
  } else {
    const numCapacity = parseInt(filterCapacity);
    displayRooms = rooms.filter((room) => room.maxCapacity >= numCapacity);
  }

  if (filterDiscount === "hasDiscount") {
    displayRooms = rooms.filter((room) => room.discount > 0);
  }


  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-14 max-w-[1280px] mx-auto ">
      {displayRooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}

export default RoomList;
