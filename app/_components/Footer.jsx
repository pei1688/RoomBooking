function Footer() {
  return (
    <div className="bg-boshe-400 md:mt-28 mt-5 text-sm md:text-md ">
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* 使用grid來調整不同設備的佈局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1280px] mx-auto py-5 lg:px-[80px] ">
          <ul className="text-zinc-100 gap-5 flex flex-col ">
            <li className="cursor-pointer duration-200 hover:underline hover:text-zinc-300">
              支援服務
            </li>
            <li className="cursor-pointer duration-200 hover:underline hover:text-zinc-300">
              常見問答
            </li>
            <li className="cursor-pointer duration-200 hover:underline hover:text-zinc-300">
              管理您的旅程
            </li>
            <li className="cursor-pointer duration-200 hover:underline hover:text-zinc-300">
              聯絡客服
            </li>
            <li className="cursor-pointer duration-200 hover:underline hover:text-zinc-300">
              安全資源中心
            </li>
          </ul>

          <ul className="text-zinc-100 gap-5 flex flex-col ">
            <li className="cursor-pointer duration-200 hover:underline hover:text-zinc-300">
              聯絡我們 | 台灣 53555 電話 +886-3-1234444 傳真 886-3-81254688
            </li>
            <li className="cursor-pointer duration-200 hover:underline hover:text-zinc-300">
              客服信箱 | hotel.service@boshe-hotel.com.tw
            </li>
            <li className="cursor-pointer duration-200 hover:underline hover:text-zinc-300">
              飯店地址 | TAIWAN TAIPEI
            </li>
          </ul>
        </div>

        {/* Footer底部文字及隱私政策連結 */}
        <div className="w-full max-w-[1280px] mx-auto mt-5 space-y-3 text-zinc-200 py-5 lg:px-[80px]" >
          <hr className="border-t-zinc-100" />
          <div className="text-sm flex flex-col sm:flex-row justify-between items-center sm:items-start">
            <span>Copyright ©  2024 BosheB&B.</span>
            <span className="cursor-pointer duration-200 hover:underline hover:text-zinc-300">
              隱私權政策
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
