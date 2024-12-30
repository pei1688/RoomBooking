"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BsHouseFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";

import { MdDiscount } from "react-icons/md";
import { Button } from "./ui/button";
import Link from "next/link";

function DiscountSlide({ roomWithDiscount }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === roomWithDiscount.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [roomWithDiscount.length]);

  // function goToPrevious(event) {
  //   if (event) event.stopPropagation();
  //   const firstSlide = currentIndex === 0;
  //   const newIndex = firstSlide
  //     ? roomWithDiscount.length - 1
  //     : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // }

  // function goToNext(event) {
  //   if (event) event.stopPropagation();
  //   const lastSlide = currentIndex === roomWithDiscount.length - 1;
  //   const newIndex = lastSlide ? 0 : currentIndex + 1;
  //   setCurrentIndex(newIndex);
  // }

  function goToSlide(index) {
    setCurrentIndex(index);
  }

  const currentRoom = roomWithDiscount[currentIndex];

  return (
    <div className="relative flex justify-center items-center group">
      {roomWithDiscount.length > 0 ? (
        <div className="relative h-[170px] w-[300px] md:w-[700px] md:h-[400px] overflow-hidden">
          {/* 房間圖片 */}
          <Image
            src={currentRoom.image}
            alt={currentRoom.name}
            fill
            className="object-cover rounded-md shadow-lg"
          />

          {/* 房間名稱和折扣 */}
          <h3 className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-zinc-800 bg-opacity-50 text-zinc-100 text-[10px] md:text-lg px-2 md:px-5 py-1 md:py-3 rounded-t-md w-full text-center flex justify-between items-center gap-2 md:gap-8 tracking-[1px] md:tracking-[2px]">
            <p className="flex items-center gap-1 md:gap-3 text-[8px] md:text-base">
              <BsHouseFill />
              {currentRoom.name}
            </p>

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex ">
              {roomWithDiscount.map((room, index) => (
                <div
                  key={index}
                  className={`cursor-pointer text-2xl font-semibold ${
                    currentIndex === index
                      ? "text-zinc-100"
                      : "text-zinc-50 opacity-50"
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  &#8226;
                </div>
              ))}
            </div>

            <p className="flex items-center gap-1 md:gap-3 text-[8px] md:text-base">
              <MdDiscount />${currentRoom.discount}
              {/* 立即預訂按鈕 */}
              <Button
                variant="link"
                className="text-[8px] md:text-sm text-boshe-100 hover:text-boshe-50"
                size="none"
              >
                <Link
                  href={`/room/${roomWithDiscount[currentIndex].id}`}
                  className="flex items-center gap-1 md:gap-3"
                >
                  立即預訂
                  <FaArrowRightLong />
                </Link>
              </Button>
            </p>
          </h3>
        </div>
      ) : (
        <p className="text-xl text-zinc-100">目前暫無優惠</p>
      )}
    </div>
  );
}

export default DiscountSlide;

{
  /* 左箭頭 */
}
{
  /* <div
            className="absolute text-zinc-800 top-1/2 left-2 hover:text-zinc-700 hover:shadow-xl z-30 opacity-0 group-hover:opacity-100 duration-200 hover:scale-110 cursor-pointer"
            onClick={(event) => goToPrevious(event)}
          >
            <IoMdArrowDropleftCircle size={20}  />
          </div> */
}

{
  /* 右箭頭 */
}
{
  /* <div
            className="absolute top-1/2 right-2 hover:text-zinc-700 hover:shadow-lg text-zinc-800 z-30 opacity-0 group-hover:opacity-100 duration-200 hover:scale-110 cursor-pointer"
            onClick={(event) => goToNext(event)}
          >
            <IoMdArrowDroprightCircle size={20}  />
          </div> */
}
