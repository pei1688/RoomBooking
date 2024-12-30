import Link from "next/link";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

import RegisterForm from "./registerForm/RegisterForm";

export const metadata = { title: "註冊" };

async function page() {
  const session = await auth();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className="flex h-[1000px] justify-center px-[80px] md:px-[80px] items-center flex-col max-w-7xl mx-auto">
      <div className="  flex flex-col">
        <RegisterForm />
        <div className="text-stone-100 mt-5">
          已經有帳號嗎?{" "}
          <Link href={"/login"} className="text-boshe-100 hover:text-boshe-50">
            登入
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
