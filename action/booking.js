"use server";

import { getBooking, getBookings } from "@/_lib/data-service";
import { supabase } from "@/_lib/supabase";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 } from "uuid";

//🔸建立新預訂
export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("尚未登入");
  // console.log(bookingData);

  const hasBreakfast = formData.get("hasBreakfast") === "要" ? true : false;

  //上傳資訊
  const newBooking = {
    ...bookingData,
    guestId: session.user.id,
    numGuest: Number(formData.get("numGuest")),
    has_breakfast: hasBreakfast,
    isPaid: false,
    status: "unconfirmed",
    description: formData.get("description").slice(0, 1000),
    code: v4(),
  };
  // console.log(newBooking);
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([newBooking]);
    if (error) throw new Error(error.message);
  } catch (error) {
    console.log(error.message);
  }
  revalidatePath(`/room/${bookingData.roomid}`);
}

//🔸更新資訊
export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingid"));
  // console.log(formData);

  const session = await auth();
  if (!session) throw new Error("你還沒登入");

  const guestBookings = await getBookings(session.user.id);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("你沒有權限更新此預訂");
  }

  const numGuest = formData.get("numGuest");
  const has_breakfast = formData.get("hasBreakfast") === "要" ? true : false;
  const description = formData.get("description").slice(0, 100);

  const updateData = {
    numGuest,
    description,
    has_breakfast,
  };

  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();
  if (error) throw new Error("Booking could not be updated");

  //重新驗證快取
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

//🔸刪除資訊
export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("你還沒登入");
  // console.log(session.user.id);

  //防止外人任意山資料庫id，(從網頁控制台獲取id刪除
  const guestBookings = await getBookings(session.user.id);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("你沒有權限刪除此預訂");
  }

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) {
    throw new Error("無法刪除此預訂");
  }
  revalidatePath("/account/reservations");
}
