"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { logout } from "@/action/user";
import { Backpack, House, UserRoundPen } from "lucide-react";

const navlink = [
  {
    name: "首頁",
    href: "/account",
    icon: <House size={22}/>,
  },
  {
    name: "旅遊訂單",
    href: "/account/reservations",
    icon: <Backpack size={22}/>,
  },
  {
    name: "個人資料",
    href: "/account/profile",
    icon: <UserRoundPen size={22}/>,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
<nav
  className="lg:static fixed inset-x-0 bottom-0 w-full lg:w-auto lg:h-auto lg:z-0 z-50 border-t lg:border-r border-boshe-500 bg-boshe-400 rounded-md"
>
  <ul className="flex lg:flex-col lg:items-start items-center gap-10 py-4 lg:justify-between lg:p-3 lg:min-h-[700px] lg:rounded-md">
    {navlink.map((link) => (
      <li key={link.name} className="lg:flex-row w-full flex-col lg:flex-grow-0 flex-1">
        <Link
          href={link.href}
          className={`text-zinc-100 w-full py-2 lg:py-auto lg:px-2 rounded-lg flex flex-col lg:flex-row items-center justify-center lg:justify-start hover:bg-boshe-300 duration-300 -tracking-tighter ${
            pathname === link.href ? "bg-boshe-300" : ""
          }`}
        >
          {/* 圖示部分 */}
          {link.icon}
          {/* 在大螢幕顯示文字，在小螢幕隱藏 */}
          <span className="lg:text-lg text-xs lg:inline lg:ml-2 items-center">{link.name}</span>
        </Link>
      </li>
    ))}

    <li className="mt-auto text-zinc-100 flex-1 items-center">
      <form action={logout}>
        <button className="text-zinc-100 w-full py-2 lg:py-auto lg:px-2 rounded-lg flex flex-col lg:flex-row items-center justify-center lg:justify-start hover:bg-boshe-300 duration-300 -tracking-tighter">
          <CiLogout size={20} />
          <span className="lg:text-lg text-xs lg:inline lg:ml-2 items-center">登出</span>
        </button>
      </form>
    </li>
  </ul>
</nav>


  );
}

export default SideNavigation;
