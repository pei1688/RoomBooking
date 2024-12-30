"use client";

import { updateProfile } from "@/action/user";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "@/_lib/zodSchema";

function UpdateGuestForm({ guest }) {
  const { email, fullName, address, phone, nationalId } = guest;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName,
      nationalId,
      address,
    },
  });

  const onSubmit = async (formData) => {
    const res = await updateProfile(formData);
    if (res?.error) {
      toast.error(`更新失敗，錯誤原因: ${res.error.message}`);
    } else {
      toast.success("更新成功");
    }
  };

  return (
    <div className="w-full max-w-lg py-4 sm:py-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <h2 className="text-lg text-boshe-100">個人資訊</h2>

          <div className="space-y-2">
            <Label className="text-gray-100 text-md">姓名</Label>
            <Input
              className="w-full text-zinc-800"
              name="fullName"
              id="fullName"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-100 text-md">身分證</Label>
            <Input
              className="w-full text-zinc-800"
              name="nationalId"
              id="nationalId"
              {...register("nationalId")}
            />
            {errors.nationalId && (
              <p className="text-red-400 text-sm">{errors.nationalId.message}</p>
            )}
          </div>

          <div className="space-y-2 pb-5">
            <Label className="text-gray-100 text-md">電子信箱</Label>
            <Input
              className="w-full text-zinc-800"
              name="email"
              id="email"
              defaultValue={email}
              disabled
            />
          </div>

          <h2 className="text-lg text-boshe-100">通訊地址、電話</h2>

          <div className="space-y-2">
            <Label className="text-gray-100 text-md">電話</Label>
            <Input
              className="w-full text-zinc-800"
              name="phone"
              id="phone"
              defaultValue={phone}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-100 text-md">地址</Label>
            <Input
              className="w-full text-zinc-800"
              name="address"
              id="address"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-400 text-sm">{errors.address.message}</p>
            )}
          </div>
        </div>

        <Button variant="update" className="mt-8 w-full" type="submit">
          更新資料
        </Button>
      </form>
    </div>
  );
}

export default UpdateGuestForm;
