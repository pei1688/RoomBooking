"use client";
import { GoPeople } from "react-icons/go";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import SubmitButton from "./SubmitButton";
import { updateBooking } from "@/action/booking";
import { toast } from "sonner";

function UpdateBookingForm({
  hasBreakfast,
  maxCapacity,
  numGuest,
  description,
  bookingid,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await updateBooking(formData);
      if (res?.error) {
        toast.error(`更新失敗，錯誤原因: ${res.error.message}`);
      } else {
        toast.success("預訂更新成功");
      }
    } catch (error) {
      console.error("更新預訂失敗：", error);
      toast.error("更新過程中出現錯誤");
    }
  };
  return (
    <form
      // action={updateBooking}
      onSubmit={handleSubmit}
      className="text-stone-100 w-full flex flex-col "
    >
      <Input type="hidden" name="bookingid" defaultValue={bookingid} />

      <div className="space-y-3">
        <Label
          className="pb-3 text-md flex gap-2 items-center"
          htmlFor="numGuests"
        >
          <GoPeople size={20} />
          選擇人數
        </Label>
        <Select openDirection="down" name="numGuest" id="numGuest">
          <SelectTrigger className="w-full   text-boshe-400 ">
            <SelectValue placeholder={`${numGuest} 人`} />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectLabel className="text-boshe-400">請選擇人數</SelectLabel>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <SelectItem
                  value={x.toString()}
                  key={x}
                  className="cursor-pointer"
                >
                  {x} 人
                </SelectItem>
              ))}
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>

      <div className=" space-y-3 mt-5">
        <Label
          className="pb-3 text-md flex items-center gap-2"
          htmlFor="hasBreakfast"
        >
          <MdOutlineFreeBreakfast size={20} />
          選擇是否需要早餐
        </Label>
        <Select
          openDirection="down"
          name="hasBreakfast"
          id="hasBreakfast"
        >
          <SelectTrigger className="w-full text-boshe-400">
            <SelectValue
              placeholder={hasBreakfast}
            />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectLabel className="text-boshe-400">
                選擇是否需要早餐
              </SelectLabel>
              <SelectItem value="要" key="要" className="cursor-pointer">
                需要
              </SelectItem>
              <SelectItem value="不要" key="不要" className="cursor-pointer">
                不需要
              </SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>

      <div className="space-y-3 flex flex-col mt-5">
        <Label
          htmlFor="description"
          className="text-md flex items-center gap-2"
        >
          <FiFileText size={20} />
          備註
        </Label>
        <textarea
          type="text"
          placeholder=" ex.早餐是否為素食..."
          name="description"
          id="description"
          className="rounded-md p-2 px-3 text-md text-boshe-500"
          defaultValue={description}
        />
      </div>

      <div className="self-end mt-5">
        <SubmitButton pendingLabel="更新中...">更新預訂資料</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateBookingForm;
