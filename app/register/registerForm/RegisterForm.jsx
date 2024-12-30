"use client";

import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";
import { Label } from "../../_components/ui/label";

import { CgCodeClimate } from "react-icons/cg";

import { registerProfile } from "@/action/user";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialRegisterForm from "../../_components/SocialRegisterForm";
import { toast } from "sonner";
import { registerSchema } from "@/_lib/zodSchema";
import { useState } from "react";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData) => {
    
    
    try {
      const res = await registerProfile(formData);
      if (res?.error) {
        toast.error(`註冊失敗，錯誤原因: ${res.error.message}`);
      } else {
        toast.success("註冊成功");
      }
    } catch (error) {
      if (error) throw new Error(error);
    }
  };

  //密碼顯示
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <h1 className="text-stone-100 text-3xl font-semibold flex items-center justify-center">
          Welcome, <CgCodeClimate size={80} />
        </h1>
        <div className="space-y-3 mt-5">
          <Label className="text-gray-100 w-[400px] items-center gap-1 text-md flex">
            姓名
          </Label>
          <Input
            type="text"
            placeholder="請輸入姓名"
            id="fullName"
            name="fullName"
            {...register("fullName")}
          />
          {errors.fullName && (
            <div className="text-sm text-red-400">
              {errors.fullName.message}
            </div>
          )}

          <Label className="text-gray-100 w-[400px] items-center gap-1 text-md  flex">
            電子信箱
          </Label>
          <Input
            type="email"
            placeholder="請輸入電子信箱"
            id="email"
            name="email"
            {...register("email")}
          />
          {errors.email && (
            <div className="text-red-400 text-sm">{errors.email.message}</div>
          )}

          <Label className="text-gray-100 w-[400px] items-center gap-1 text-md  flex">
            電話
          </Label>
          <Input
            type="text"
            placeholder="請輸入電話"
            id="phone"
            name="phone"
            {...register("phone")}
          />
          {errors.phone && (
            <div className="text-red-400 text-sm">{errors.phone.message}</div>
          )}

          <Label className="text-gray-100 w-[300px] items-center gap-1 text-md  flex">
            密碼
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="請輸入密碼"
              id="password"
              name="password"
              {...register("password")}
            />
            {errors.password && (
              <div className="text-red-400 text-sm">
                {errors.password.message}
              </div>
            )}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-2.5 right-0 px-3 text-sm cursor-pointer hover:text-gray-500 text-gray-600"
            >
              {showPassword ? "隱藏" : "顯示"}
            </span>
          </div>

          <Label className="text-gray-100 w-[300px] items-center gap-1 text-md  flex">
            確認密碼
          </Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="再次輸入密碼"
              {...register("confirmPassword")}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-2.5 right-0 px-3 text-sm cursor-pointer hover:text-gray-500 text-gray-600"
            >
              {showConfirmPassword ? "隱藏" : "顯示"}
            </span>
          </div>
          {errors.confirmPassword && (
            <div className="text-red-400 text-sm">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div>
          <Button type="submit" variant="login">
            註冊
          </Button>
        </div>
      </form>
      <div className="self-center mt-3  text-gray-100">or</div>

      <SocialRegisterForm />
    </div>
  );
}

export default RegisterForm;
