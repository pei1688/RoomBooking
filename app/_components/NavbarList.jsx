"use client";

import { useState } from "react";
import Link from "next/link";
import NavAvatar from "./NavAvatar";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { logout } from "@/action/user";
import { Menu, X } from "lucide-react"; // 引入漢堡選單圖示

function NavbarList({ user, guest }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // 用於控制漢堡選單的狀態

  const isActive = (path) =>
    pathname === path ? "border-b-2 border-boshe-300 pb-1" : "";

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className={`font-semibold lg:text-lg md:text-md text-sm ${
        pathname !== "/"
          ? "fixed top-0 left-0 w-full z-50 bg-boshe-500 shadow-md"
          : ""
      } text-warm-800`}
    >
      <div className="flex justify-between items-center w-full max-w-[1280px] lg:mx-auto px-4 sm:px-6 md:px-10 lg:px-[80px]">
        <Logo />

        {/* 大螢幕顯示選單 */}
        <ul className="hidden sm:flex gap-5 md:gap-8 lg:gap-10 items-center text-zinc-300 z-50">
          <li>
            <Link
              href={"/about"}
              className={` hover:text-zinc-200 hover:border-b-2 hover:pb-1 hover:border-boshe-300 ${isActive(
                "/about"
              )}`}
            >
              關於我們
            </Link>
          </li>
          <li>
            <Link
              href={"/room"}
              className={`hover:text-zinc-200 hover:border-boshe-300 hover:pb-1 hover:border-b-2 ${isActive(
                "/room"
              )}`}
            >
              房型與設施
            </Link>
          </li>
        
          <li>
            {user ? (
              <Link href={"/account"}>
                <NavAvatar user={user} guest={guest} />
              </Link>
            ) : (
              ""
            )}
          </li>
          <li>
            {!user ? (
              <button className="hover:bg-boshe-400 duration-200 font-semibold border text-gray-100 px-4 lg:text-lg md:text-md text-sm rounded-md border-gray-100">
                <Link href={"/login"}> 登入</Link>
              </button>
            ) : (
              <form action={logout}>
                <button className="hover:bg-boshe-400 duration-200 font-semibold border text-gray-100 px-4 lg:text-lg md:text-md text-sm rounded-md border-gray-100">
                  登出
                </button>
              </form>
            )}
          </li>
        </ul>

        {/* 小螢幕漢堡選單按鈕 */}
        <div className="sm:hidden z-50">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="focus:outline-none text-zinc-300"
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* 小螢幕選單內容 */}
      {menuOpen && (
        <div className="sm:hidden bg-boshe-500  text-zinc-300 w-full fixed top-[60px] left-0 z-40 p-4 space-y-4 shadow-lg">
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href={"/about"}
                className={`block duration-150 hover:text-zinc-200 p-2 hover:bg-boshe-300 rounded-lg`}
                onClick={toggleMenu} // 點擊後關閉選單
              >
                關於我們
              </Link>
            </li>
            <li>
              <Link
                href={"/room"}
                className={`block hover:text-zinc-200 p-2 hover:bg-boshe-300 rounded-lg`}
                onClick={toggleMenu} // 點擊後關閉選單
              >
                房型與設施
              </Link>
            </li>
           
            <li>
              {user ? (
                <Link
                  href={"/account"}
                  className="block hover:text-zinc-200 p-2 hover:bg-boshe-300 rounded-lg"
                  onClick={toggleMenu} // 點擊後關閉選單
                >
                  我的帳戶
                </Link>
              ) : (
                ""
              )}
            </li>
            <li>
              {!user ? (
                <Link
                  href={"/login"}
                  className="block hover:bg-boshe-400 duration-200 font-semibold border text-gray-100 px-4 text-center rounded-md border-gray-100"
                  onClick={toggleMenu} // 點擊後關閉選單
                >
                  登入
                </Link>
              ) : (
                <form action={logout}>
                  <button
                    className="block w-full hover:bg-boshe-400 duration-200 font-semibold border text-gray-100 px-4 py-2 rounded-md border-gray-100"
                    onClick={toggleMenu} // 點擊後關閉選單
                  >
                    登出
                  </button>
                </form>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavbarList;
