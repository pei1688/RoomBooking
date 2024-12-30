import Image from "next/image";
import bg from "@/public/bg.jpg";
import Link from "next/link";

export const metadata = { title: "首頁" };
export default function Home() {
  return (
    <div>
      <main className="mt-24">
        <Image
          src={bg}
          fill
          className="object-cover object-top"
          alt="The Wild Oasis logo"
        />
        <div className="relative z-10 text-center translate-y-[150px] md:translate-y-[350px]">
          <h1 className="md:text-7xl text-2xl text-warm-800 mb-10 tracking-tight font-semibold ">
            Welcome to Boshe-B&B.
          </h1>
          <Link
            href="/room"
            className="bg-warm-700 px-5 md:px-8 py-3 md:py-4 rounded-md text-boshe-500 text-lg font-semibold hover:bg-warm-800 transition-all"
          >
            開始您的預訂
          </Link>
        </div>
      </main>
    </div>
  );
}
