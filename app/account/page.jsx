import { getGuest, getRooms } from "@/_lib/data-service";
import { auth } from "@/auth";
import DiscountSlide from "../_components/DiscountSlide";
import { MdDiscount } from "react-icons/md";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/");
  const guest = await getGuest(session.user.email);
  const { fullName } = guest;
  const rooms = await getRooms();

  const roomWithDiscount = rooms.filter((room) => room.discount > 0);

  return (
    <div className=" rounded-md flex-col bg-boshe-400 w-full min-h-[700px] items-center  text-zinc-100 flex p-5">
      <h1 className="mr-2 font-semibold text-2xl">歡迎回來,  {fullName}</h1>

      <div className="flex flex-col justify-center items-center my-10 h-full">
        <div className="text-xl ">
          <h2 className=" flex items-center gap-3">
            {" "}
            <MdDiscount size={20} />
            優惠資訊
          </h2>
        </div>
      </div>
      <DiscountSlide roomWithDiscount={roomWithDiscount} />
    </div>
  );
}
