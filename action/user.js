"use server";

import { supabase } from "@/_lib/supabase";
import { auth, signIn, signOut } from "@/auth";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 } from "uuid";

//註冊
export async function registerProfile(formData) {
  const fullName = formData.fullName;
  const email = formData.email;
  const password = formData.password;
  const phone = formData.phone;

  // 加密密碼
  const hashedPassword = await hash(password, 12);
  // 檢查信箱是否已經存在
  const { data: existingUser, error } = await supabase
    .from("guest")
    .select("email")
    .eq("email", email)
    .single();

  if (existingUser) {
    throw new Error("此電子信箱已註冊過");
  }
  // 將用戶資料插入 guest 資料表
  const { error: insertError } = await supabase.from("guest").insert({
    fullName,
    email,
    password: hashedPassword,
    role: "user",
    phone,
    authProviderId: v4(),
  });

  if (insertError) {
    throw new Error(insertError.message);
  } else {
    console.log("註冊成功");
    redirect("/login");
  }
}

//登入
export async function login(formData) {
  const email = formData.email;
  const password = formData.password;
  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
  redirect("/");
}

export async function socialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { callbackUrl: "/" });
}

//登出
export async function logout() {
  await signOut();
}

//更新個人資訊
export async function updateProfile(formData) {
  const session = await auth();
  console.log(session);

  if (!session.user) {
    throw new Error("你沒有權限更新");
  }
  const fullName = formData.fullName;
  const nationalId = formData.nationalId;
  const address = formData.address;

  const { data, error } = await supabase
    .from("guest")
    .update({ fullName, nationalId, address })
    .eq("authProviderId", session.user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/account");
}
