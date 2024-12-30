// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import Modal from "./Modal";
// import { Button } from "./ui/button";
// import { useState } from "react";

// function Filter() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [showModal, setShowModal] = useState(false); // 控制 Modal 顯示狀態
//   const [selectedFilter, setSelectedFilter] = useState(
//     searchParams.get("capacity") ?? "all"
//   ); // 本地狀態儲存篩選條件

//   function handlefilter(filter) {
//     setSelectedFilter(filter); // 更新本地狀態中的篩選條件
//   }

//   function handleSubmit() {
//     const params = new URLSearchParams(searchParams);
//     params.set("capacity", selectedFilter); // 提交時更新 URL 的篩選參數
//     router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // 更新路由參數
//     setShowModal(false); // 關閉 Modal
//   }

//   return (
//     <div className="my-5 tracking-[2px]">
//       <Button variant="filter" onClick={() => setShowModal(true)}>
//         篩選
//       </Button>

//       {showModal && (
//         <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
//           <div className="max-w-[1280px] mx-auto text-stone-100 py-5">
//             <div className="w-[400px] h-[40px] border border-boshe-300 items-center gap-3 rounded-full mx-auto flex justify-center shadow-xl bg-boshe-400 opacity-85">
//               <FilterButton
//                 filter="all"
//                 handlefilter={handlefilter}
//                 activeFilter={selectedFilter} // 本地狀態作為篩選依據
//               >
//                 全部
//               </FilterButton>
//               <FilterButton
//                 filter="small"
//                 handlefilter={handlefilter}
//                 activeFilter={selectedFilter}
//               >
//                 1-3床位
//               </FilterButton>
//               <FilterButton
//                 filter="medium"
//                 handlefilter={handlefilter}
//                 activeFilter={selectedFilter}
//               >
//                 4-7床位
//               </FilterButton>
//               <FilterButton
//                 filter="large"
//                 handlefilter={handlefilter}
//                 activeFilter={selectedFilter}
//               >
//                 8以上床位
//               </FilterButton>
//             </div>

//             {/* 提交按鈕 */}
//             <div className="flex justify-center mt-5">
//               <Button onClick={handleSubmit}>提交</Button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }

// function FilterButton({ filter, handlefilter, activeFilter, children }) {
//   return (
//     <button
//       onClick={() => handlefilter(filter)}
//       className={`hover:bg-boshe-300 px-3 py-1 rounded-full duration-200 ${
//         filter === activeFilter ? "bg-boshe-300 text-stone-100" : ""
//       }`}
//     >
//       {children}
//     </button>
//   );
// }

// export default Filter;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Modal from "../Modal/Modal";
import { Button } from "../ui/button";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";



function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false); // 控制 Modal 顯示狀態
  const [discount, setDiscount] = useState(
    searchParams.get("discount") || "all"
  );
  const [capacity, setCapacity] = useState(
    Number(searchParams.get("capacity")) || 1
  ); // 保存篩選的選擇人數，默認值為1

  function handleIncrease() {
    setCapacity((prev) => prev + 1); // 增加人數
  }

  function handleDecrease() {
    if (capacity > 1) {
      setCapacity((prev) => prev - 1); // 減少人數，最小值為1
    }
  }

  function handleSubmit() {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", capacity); // 提交時更新 URL 的篩選參數
    if (discount === "all") {
      params.delete("discount");
    } else {
      params.set("discount", discount); // 更新 URL 的 discount 篩選參數
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // 更新路由參數
    setShowModal(false); // 關閉 Modal
  }
  function handleReset() {
    setCapacity(1);
    setDiscount("all");
  }

  return (
    <div className="sm:mt-10 md:mt-5 mt-5 mb-5">
      <Button variant="filter" size="sm" onClick={() => setShowModal(true)}>
      <CiFilter size={20}/>

      </Button>

      {showModal && (
        <Modal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          contentClassName="lg:w-[568px] md:w-[450px] h-auto"
        >
          <div className="max-w-[1280px] mx-auto text-zinc-100 text-lg ">
            <div className="flex flex-col h-auto  mx-auto ">
              <h1 className="tracking-[4px] text-xl mt-5 self-center">
                篩選條件
              </h1>

              <div className="flex items-center justify-between gap-5 my-5 px-3">
                <div className="tracking-[4px] text-center px-4">床位</div>
                <div className="gap-6 flex items-center">
                  <Button
                    onClick={handleDecrease}
                    variant="nextprev"
                    size="none"
                  >
                    <FaMinus size={15} />
                  </Button>

                  <span>{capacity}</span>
                  <Button
                    onClick={handleIncrease}
                    variant="nextprev"
                    disabled={capacity >= 8}
                    size="none"
                  >
                    <FaPlus size={15}/>

                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-5 mx-auto my-5">
                <label
                  htmlFor="discount"
                  className="text-xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  顯示有折扣的房間
                </label>
                <Checkbox
                  id="discount"
                  checked={discount === "hasDiscount"}
                  onCheckedChange={(checked) =>
                    setDiscount(checked ? "hasDiscount" : "all")
                  }
                />
              </div>
            </div>

            {/* 提交按鈕 */}
            <div className="flex justify-between my-5 px-3">
              <Button onClick={handleReset} variant="reset" className="">
                重置
              </Button>
              <Button variant="filter" onClick={handleSubmit}>
                過濾
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Filter;
