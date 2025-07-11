import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [onClose]);

  return (
    <>
      <div
        className={`absolute top-22 right-4 transition-all duration-400 ${
          isShown ? "opacity-100" : "opacity-0"
        } `}
      >
        <div
          className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
            type === "delete" ? "bg-red-500" : "bg-green-500"
          } after:absolute after:left-0 after:to-0 after:rounded-l-lg `}
        >
          <div className="flex items-center gap-2 py-2 px-4">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                type === "delete" ? "bg-red-50" : "bg-green-50"
              } `}
            >
              {type === "delete" ? (
                <MdDeleteOutline className="text-xl text-red-500" />
              ) : (
                <LuCheck className="text-xl text-green-500" />
              )}
            </div>
            <p className="text-sm text-slate-500">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toast;
