"use client";
import { loginSchema } from "@/_lib/zodSchema";
import { login } from "@/action/user";
import SocialRegisterForm from "@/app/_components/SocialRegisterForm";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { toast } from "sonner";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const res = await login(formData);

      if (res?.error) {
        toast.error(`登入失敗，錯誤原因: ${res.error.message}`);
      } else {
        toast.success("登入成功,歡迎回來");
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-stone-100 text-3xl font-semibold">歡迎回來</h1>
        <div className="space-y-3 mt-5">
          <Label className="text-gray-100 w-[400px] items-center gap-1 text-md flex">
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
            <span className="text-sm text-red-400">{errors.email.message}</span>
          )}
        </div>
        <div className=" mt-5 space-y-3 ">
          <Label className="text-gray-100 w-[400px] items-center gap-1 text-md flex">
            密碼
          </Label>
          <div className="relative flex ">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="請輸入密碼"
              id="password"
              name="password"
              {...register("password")}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-zinc-800 inset-y-2.5 cursor-pointer  right-0 px-3 text-sm hover:text-zinc-600 hover:underline "
            >
              {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </span>
          </div>
          {errors.password && (
            <span className="text-sm text-red-400">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="mt-5">
          <Button type="submit" variant="login">
            登入
          </Button>
        </div>
      </form>

      <div className="self-center mt-5 text-gray-100">or</div>
      <SocialRegisterForm />
    </div>
  );
}

export default LoginForm;
