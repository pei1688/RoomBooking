"use client";
import {
  differenceInDays,
  format,
  formatDistance,
  isPast,
  isToday,
  parseISO,
} from "date-fns";
import Image from "next/image";
import { zhTW } from "date-fns/locale";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineFastfood, MdOutlineNoFood } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

import { RiEditLine } from "react-icons/ri";
import { Button } from "../ui/button";
import Link from "next/link";
import DeleteReservation from "../DeleteReservation";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
    locale: zhTW,
  }).replace("約", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    created_at,
    startDate,
    endDate,
    numNight,
    numGuest,
    total_price,
    has_breakfast,
    status,
    code,
    room: { name, image },
  } = booking;

  const hasBreakfast =
    has_breakfast === true ? (
      <MdOutlineFastfood size={20} />
    ) : (
      <MdOutlineNoFood size={20} />
    );

  // 計算距離入住日還有幾天
  const daysUntilStartDate = differenceInDays(new Date(startDate), new Date());

  return (
    <div className="flex flex-col lg:flex-row border w-full text-stone-100 border-boshe-200 bg-boshe-400 rounded-md tracking-[2px]">
      {/* 圖片區域 */}
      <div className="relative h-40 w-full lg:w-48 aspect-square">
        <Image src={image} alt={`room ${name}`} fill className="object-cover" />
      </div>

      {/* 資訊區域 */}
      <div className="flex-grow flex flex-col gap-1 px-2 lg:px-6 pt-4">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex gap-2 lg:gap-5 text-center lg:text-lg justify-between items-center">
            <h3>{name}</h3>
            <div>
              <span className="text-boshe-100">{numNight}</span> 晚
            </div>
            <div className="lg:block hidden">{hasBreakfast}</div>
            <div className="lg:flex hidden items-center gap-2">
              <LuUsers2 size={20} />
              {numGuest}
            </div>
            <p className="text-xl text-boshe-100 hidden lg:block">
              ${total_price}
            </p>
          </div>

          {/* 狀態標籤 */}
          {isToday(new Date(startDate)) ? (
            <span className="bg-boshe-200 text-zinc-50 h-7 px-3 uppercase text-xs flex items-center rounded-sm mt-2 lg:mt-0">
              當日入住
            </span>
          ) : isPast(new Date(startDate)) ? (
            <span className="bg-red-500 text-red-50 h-7 px-3 uppercase text-xs flex items-center rounded-sm mt-2 lg:mt-0">
              過去入住
            </span>
          ) : (
            <span className="bg-green-700 text-green-200 h-7 px-3 uppercase text-xs flex items-center rounded-sm mt-2 lg:mt-0">
              即將入住
            </span>
          )}
        </div>

        {/* 桌面版詳細資訊 */}
        <div className="text-sm text-boshe-50 space-y-2 my-3 hidden lg:block">
          <span className=" text-boshe-100 border-b pb-1 border-b-boshe-200">
            預訂時間:
            {format(new Date(created_at), "EEE, MMM dd yyyy, p", {
              locale: zhTW,
            })}
          </span>
          <div className="flex  items-center gap-2 border-b pb-1 border-b-boshe-200">
            <span className="flex ">
              <span className="">入住時間:</span>
              {format(new Date(startDate), "EEE, MMM dd yyyy", {
                locale: zhTW,
              })}
              {" ~ "}
              {format(new Date(endDate), "EEE, MMM dd yyyy", {
                locale: zhTW,
              })}
            </span>
            <span className="text-xs text-zinc-300 ml-2">
              (
              {isToday(new Date(startDate))
                ? "入住日"
                : formatDistanceFromNow(startDate)}
              )
            </span>
          </div>

          <div className="flex items-center justify-end">
            <span className="text-boshe-200">code:</span>
            <span className="text-red-600 ">{code}</span>
          </div>
        </div>
      </div>

      {/* 小於lg時的手機版詳細資訊 */}
      <div className="lg:hidden gap-5 flex items-center justify-around text-sm my-5">
        <div className="w-full">
          <details className=" p-2  text-stone-100 rounded-md">
            <summary className="cursor-pointer flex items-center justify-between">
              <span>顯示詳情</span>
              <IoIosArrowDown size={20} />
            </summary>
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex justify-between">
                <span>總金額：</span>
                <span>${total_price}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>人數：</span>
                <div className="flex items-center gap-2">
                  <LuUsers2 size={20} />
                  <span className="text-md">{numGuest}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>早餐：</span>
                <div className="flex items-center">{hasBreakfast}</div>
              </div>
              <div className="flex justify-between items-center">
                <span>code:</span>
                <span className="text-red-600 ">{code}</span>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* 編輯與刪除按鈕 */}
      <div className="flex lg:flex-col gap-2 justify-around lg:justify-center border-t lg:border-t-0 lg:border-l border-boshe-300 lg:p-3">
        {daysUntilStartDate > 7 ? (
          <Button variant="link">
            <Link
              href={`/account/reservations/edit/${id}`}
              className="flex items-center gap-1"
            >
              <RiEditLine size={16} />
              編輯
            </Link>
          </Button>
        ) : (
          <Button variant="link" disabled>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="flex items-center gap-1"
            >
              <RiEditLine size={16} />
              編輯
            </Link>
          </Button>
        )}

        <hr className="border-t-2 border-boshe-300" />

        <DeleteReservation onDelete={onDelete} bookingId={id} />
      </div>
    </div>
  );
}

export default ReservationCard;
