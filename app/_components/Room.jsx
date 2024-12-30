import Image from "next/image";
import Link from "next/link";
import min5 from "@/public/min5.png";
import min2 from "@/public/min2.png";
import min3 from "@/public/min3.png";
import min4 from "@/public/min4.png";

import Revservation from "./Revservation";
import { getBookedDatesByRoomId } from "@/_lib/data-service";
import { auth } from "@/auth";
import LoginMessage from "./LoginMessage";

async function Room({ room }) {
  const { name, maxCapacity, image, introduce } = room;
  const session = await auth();
  const user = session?.user;

  const [bookedDates] = await Promise.all([getBookedDatesByRoomId(room.id)]);

  return (
    <div className="container mx-auto tracking-[2px] px-4">
      {/* 房間名稱與返回按鈕 */}
      <div className="flex justify-between items-center mt-5">
        <h1 className="text-zinc-100 font-semibold text-xl md:text-2xl lg:text-3xl">
          {name}
        </h1>
        <Link href={"/room"}>
          <button className="text-zinc-100 text-sm md:text-md px-3 py-1 rounded-md hover:bg-boshe-300 bg-boshe-400 duration-200">
            返回 →
          </button>
        </Link>
      </div>

      {/* 圖片區塊 */}
      <section className="flex flex-col lg:flex-row justify-between my-5 lg:h-[500px] gap-4">
        {/* 主圖片 */}
        <div className="w-full lg:w-[60%]">
          <Image
            src={image}
            width={600}
            height={600}
            alt={`Image of ${name}`}
            className="object-cover rounded-xl w-full h-[300px] md:h-[400px] lg:h-[500px] hover:opacity-85 cursor-pointer"
          />
        </div>

        {/* 小圖片網格 */}
        <div className="md:grid grid-cols-2 gap-4 w-full lg:w-[35%] hidden">
          <Image
            src={min5}
            alt="Image min5"
            className="object-cover hover:opacity-85 cursor-pointer w-full h-[150px] md:h-[200px] lg:h-[240px]"
          />
          <Image
            src={min2}
            alt="Image min2"
            className="object-cover hover:opacity-85 cursor-pointer w-full h-[150px] md:h-[200px] lg:h-[240px]"
          />
          <Image
            src={min3}
            alt="Image min3"
            className="object-cover hover:opacity-85 cursor-pointer w-full h-[150px] md:h-[200px] lg:h-[240px]"
          />
          <Image
            src={min4}
            alt="Image min4"
            className="object-cover hover:opacity-85 cursor-pointer w-full h-[150px] md:h-[200px] lg:h-[240px]"
          />
        </div>
      </section>

      {/* 房間介紹與預訂區塊 */}
      <section className="flex flex-col lg:flex-row justify-between h-auto lg:h-[500px] gap-6">
        {/* 房間資訊 */}
        <div className="lg:w-[60%] flex flex-col">
          <span className="text-lg md:text-xl text-zinc-100 font-bold mb-3">
            為旅行者、背包客和尋求冒險的人提供了舒適的居住環境。
          </span>
          <span className="text-sm md:text-md text-zinc-100 mb-5">
            {maxCapacity} / 人 1 間房間 1 間衛浴
          </span>
          <hr className="opacity-90 border border-boshe-200 my-3" />
          <div className="grid grid-cols-2 gap-3 mt-5 text-zinc-100">
            <span className="flex items-center gap-2">
              Wi-Fi
            </span>
            <span className="flex items-center">自助入住</span>
            <span className="flex items-center">可寄放行李</span>
            <span className="flex items-center">浴缸</span>
            <span className="flex items-center">免費停車</span>
            <span className="flex items-center">波西米亞風</span>
          </div>
          <hr className="opacity-90 border border-boshe-200 my-6" />
          <div className="text-zinc-100 leading-loose">{introduce}</div>
        </div>

        {/* 預訂區塊 */}
        {user ? (
          <div className="w-full lg:w-[35%] flex flex-col">
            <Revservation room={room} user={user} bookedDates={bookedDates} />
          </div>
        ) : (
          <div className="w-full lg:w-[35%]">
            <LoginMessage bookedDates={bookedDates} />
          </div>
        )}
      </section>
    </div>
  );
}

export default Room;
