"use client";
import { IoClose } from "react-icons/io5";

function Modal({ isVisible, children, onClose, contentClassName = "" }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0  z-50 bg-boshe-400 bg-opacity-25 backdrop-blur-sm flex justify-center items-center "
      id="wrapper"
      onClick={handleClose}
    >
      <div
        className={`  bg-boshe-500  relative border border-boshe-300 rounded-xl ${contentClassName}`}
      >
        <div className=" p-2 rounded-xl ">
          <button
            onClick={() => onClose()}
            className="text-zinc-100 text-xl absolute top-3 right-4 border border-boshe-500 hover:bg-boshe-400 duration-200 hover:border rounded-md hover:border-boshe-300 hover:text-zinc-200"
          >
            <IoClose size={20} />
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
