"use client";
import { FiTrash } from "react-icons/fi";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { useState } from "react";
import Modal from "./Modal/Modal";
import { Trash } from "lucide-react";

function DeleteReservation({ onDelete, bookingId }) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false); // 控制 Modal 顯示狀態

  function handleDelete() {
    startTransition(() => {
      onDelete(bookingId);
      setShowModal(false); // 刪除後關閉 Modal
    });
  }

  return (
    <div>
      {/* 刪除按鈕 */}
      <Button
        variant="link"
        className="flex items-center gap-1 p-2 hover:text-boshe-100 md:mt-3 w-full"
        onClick={() => setShowModal(true)} // 點擊後打開 Modal
      >
        <FiTrash size={16} />
        <span>刪除</span>
      </Button>

      {/* Modal 確認窗口 */}
      {showModal && (
        <Modal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          contentClassName="w-[600px] h-[200px]"
        >
          <div className="p-5 text-zinc-100  flex flex-col   rounded-xl">
            <div className="flex">
              <Trash size={50} className="text-zinc-100  mr-5" />
              <div className="tracking-[3px]">
                <h className="text-md">確認刪除</h>
                <p className="text-md">
                  你確定要刪除這個預訂嗎？此操作無法撤銷。
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-14">
              <Button
                variant="destructive"
                onClick={handleDelete} // 確認後執行刪除操作
                disabled={isPending}
              >
                {isPending ? "刪除中..." : "確認刪除"}
              </Button>
              <Button variant="check" onClick={() => setShowModal(false)}>
                取消
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default DeleteReservation;

