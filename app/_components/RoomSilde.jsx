"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function RoomSilde({ image, name, images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = [image, ...images];

  function goToPrevious(event) {
    event.stopPropagation();
    const FirstSlide = currentIndex === 0;
    const newIndex = FirstSlide ? allImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  function goToNext(event) {
    event.stopPropagation();
    const lastSlide = currentIndex === allImages.length - 1;
    const newIndex = lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  function goTOslide(slideIndex) {
    setCurrentIndex(slideIndex);
  }

  return (
    <div className="relative group ">
      <div
        className="absolute text-zinc-200 top-1/2 left-2 hover:text-zinc-50   hover:shadow-xl z-30 opacity-0 group-hover:opacity-100 duration-200 hover:scale-110"
        onClick={(event) => goToPrevious(event)}
      >
        <ArrowLeft size={30} />
      </div>
      <div
        className="absolute top-1/2 right-2 hover:text-zinc-50 hover:shadow-lg text-zinc-200 z-30 opacity-0 group-hover:opacity-100 duration-200  hover:scale-110"
        onClick={(event) => goToNext(event)}
      >
        <ArrowRight size={30} />
      </div>

      {/* 外部容器 */}
      <div className="relative overflow-hidden w-full">
        {" "}
        <div
          className="flex transition-transform ease-out duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }} // 移動整個圖片列
        >
          {allImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              width={600}
              height={320}
              alt={`Room ${name} Image ${index}`}
              className="object-cover w-full h-full"
            />
          ))}
        </div>
      </div>
      {/*點點*/}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex ">
        {allImages.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className={`cursor-pointer text-3xl ${
              slideIndex === currentIndex
                ? "text-white opacity-100" // 高亮顯示當前點點
                : "text-zinc-50 opacity-50" // 半透明顯示其他點點
            } transition-opacity`}
            onClick={() => goTOslide(slideIndex)}
          >
            &#8226;
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomSilde;
