import { getRoom, getRooms } from "@/_lib/data-service";
import Room from "@/app/_components/Room";

export async function generateMetadata({ params }) {
  const { name } = await getRoom(params.roomId);
  return { title: `${name}` };
}

//轉成靜態路由預先獲取數據
export async function generateStaticParams() {
  const rooms = await getRooms();
  const ids = rooms.map((room) => ({
    roomId: String(room.id),
  }));
  return ids
}

async function page({ params }) {
  const room = await getRoom(params.roomId);

  return (
    <div>
      <Room room={room} />
    </div>
  );
}

export default page;
