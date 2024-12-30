import { getDetailRoom } from "@/_lib/data-service";
import Link from "next/link";
import { HiMiniUsers } from "react-icons/hi2";
import RoomSilde from "../RoomSilde";


// export const revalidate = 3600

async function RoomCard({ room }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = room;
  
  const roomDetail = await getDetailRoom(id);
  const roomImages = JSON.parse(roomDetail[0].detail_image);

  return (
    <div>
      <div className="flex flex-col duration-300 transition-transform transform overflow-hidden shadow-md cursor-pointer tracking-[2px] border border-boshe-200 rounded-md">
        {/* 圖片部分 */}
        <RoomSilde
          name={name}
          images={roomImages}
          image={image}
          className="w-full h-[200px] object-cover" /* 固定高度，確保圖片不變形 */
        />

        {/* 房間信息 */}
        <div className="pt-5 flex flex-col justify-between flex-grow pl-2">
          {/* 房間名稱與床位資訊 */}
          <div className="flex justify-between mb-2">
            <h3 className="text-lg text-stone-200">{name}</h3>
          </div>

          <div className="text-stone-200 mb-2 flex items-center gap-2">
            <HiMiniUsers size={16} />
            {maxCapacity} / 床位 
          </div>

          {/* 價格和按鈕部分 */}
          <div className="flex flex-col  items-baseline justify-between space-y-3 md:space-y-0 my-3">
            <div className="text-md font-bold text-stone-200">
              {discount > 0 ? (
                <>
                  <span className="text-md text-boshe-50">
                    ${regularPrice - discount}
                  </span>
                  <span className="line-through text-gray-400 ml-2">
                    ${regularPrice}
                  </span>
                </>
              ) : (
                <span className="text-md">${regularPrice}</span>
              )}
              <span className="text-sm ml-1"> TWD / 晚</span>
            </div>

            <Link href={`/room/${id}`} className="ml-auto px-2">
              <button className="bg-boshe-400 md:mt-5 text-stone-200 px-3 py-1  rounded-md hover:bg-boshe-300 transition">
                詳細資訊 →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
