import { z } from "zod";

//註冊表單
export const registerSchema = z
  .object({
    fullName: z
      .string({ required_error: "名字為必填欄位" })
      .min(1, { message: "欄位不得為空" })
      .min(2, { message: "名字至少2個字數" })
      .max(10, { message: "名字最多10個字數" })
      .regex(
        /^[a-zA-Z0-9_\u4e00-\u9fa5]*$/,
        "只能包含中文、英文、數字及底線，不可包含空白及特殊符號"
      ),
    email: z
      .string()
      .min(1, { message: "欄位不得為空" })
      .email({ message: "信箱格式錯誤" }),
    phone: z
      .string()
      .min(1, { message: "欄位不得為空" })
      .regex(/^\d+$/, { message: "電話只能包含數字" }),
    password: z
      .string()
      .min(1, { message: "欄位不得為空" })
      .min(8, { message: "密碼至少為8" })
      .max(15, { message: "密碼最多為15碼" })
      .regex(
        /^[a-zA-Z0-9_\u4e00-\u9fa5]*$/,
        "只能包含中文、英文、數字及底線，不可包含空白及特殊符號"
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "欄位不得為空" })
      .min(8, { message: "密碼至少為8" })
      .max(15, { message: "密碼最多為15碼" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "輸入的密碼不一致",
    path: ["confirmPassword"],
  });

// 個人資料更新編輯表單
export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "欄位不得為空" })
    .min(2, { message: "名字至少2個字數" })
    .max(10, { message: "名字最多10個字數" })
    .regex(
      /^[a-zA-Z0-9_\u4e00-\u9fa5]*$/,
      "只能包含中文、英文、數字及底線，不可包含空白及特殊符號"
    ),
  nationalId: z
    .string()
    .min(1, { message: "欄位不得為空" })
    .min(10, { message: "身分證格式錯誤" })
    .max(10, { message: "身分證格式錯誤" }),
  address: z.string().optional(),
});

//登入
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "欄位不得為空" })
    .email({ message: "信箱格式錯誤" }),
  password: z.string().min(1, { message: "欄位不得為空" }),
});

//編輯
export const updateBookingSchema = z.object({
  numGuest: z.string().min(1, { message: "請選擇人數" }),
  hasBreakfast: z.string().min(1, { message: "請選擇是否需要早餐" }),
  description: z.string().max(100, { message: "備註不得超過100字" }),
  bookingid: z.string(),
});
