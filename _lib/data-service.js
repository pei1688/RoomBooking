import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";

//獲取房間資料
export async function getRoom(id) {
  const { data, error } = await supabase
    .from("room")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
  }

  return data;
}

export const getRooms = async function () {
  const { data, error } = await supabase
    .from("room")
    .select("id, name, maxCapacity, regularPrice,discount, image,introduce")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("rooms could not be loaded");
  }

  return data;
};

export const getGusets = async function () {
  const { data, error } = await supabase
    .from("guest")
    .select("fullName,email,password,role")
    .order("fullName");

  if (error) {
    console.error(error);
    throw new Error("rooms could not be loaded");
  }

  return data;
};

//過濾
export const getFilteredRooms = async (capacity) => {
  // 使用 Supabase 過濾房間
  const { data, error } = await supabase
    .from("room")
    .select("*")
    .gte("maxCapacity", capacity); // 過濾出 maxCapacity 大於等於指定人數的房間

  if (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }

  return data;
};

//獲取預訂日期
export async function getBookedDatesByRoomId(roomid) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("roomid", roomid)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Bookings could not be loaded");
  }

  // 獲取預訂開始時間跟最後一天
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getBookedDates() {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate,has_breakfast, endDate, numNight, numGuest, total_price, guestId,room(name, image)"
    )
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Bookings could not be loaded");
  }

  // 獲取預訂開始時間跟最後一天
  const AllbookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return AllbookedDates;
}

export async function getBookings(guestId) {
  const { data, error } = await supabase
    .from("bookings")
    // 明確選取所需欄位，減少不必要的數據傳輸
    .select(
      "id, created_at, startDate,has_breakfast, endDate, numNight, numGuest, total_price,code, status,room(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error("Error fetching bookings:", error.message);
    throw new Error("無法加載預訂", error);
  }

  // 返回資料和計數
  return data;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    // 明確選取所需欄位，減少不必要的數據傳輸
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching bookings:", error.message);
    throw new Error("無法加載預訂");
  }

  // 返回資料和計數
  return data;
}

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  const { data, error } = await supabase
    .from("guest")
    .select("*")
    .eq("email", email)
    .single();
  // console.log(data);

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

//獲取房間細節圖片
export async function getDetailRoom(id) {
  const { data, error } = await supabase
    .from("room")
    .select("detail_image")
    .eq("id", id);

  return data;
}
