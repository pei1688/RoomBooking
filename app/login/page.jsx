import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "./loginForm/LoginForm";

async function page() {
  const session = await auth();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className="flex h-[800px] -tracking-tighter justify-center px-[80px] md:px-[80px] items-center flex-col max-w-7xl mx-auto">
      <div className=" flex flex-col">
        <LoginForm />
        <div className="text-stone-100 mt-5">
          還沒有帳號嗎?
          <Link
            href={"/register"}
            className="text-boshe-100  hover:text-boshe-50"
          >
            註冊
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
