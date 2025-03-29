import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = (onLogout) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className=" text-sm rounded-full bg-slate-300 w-12 h-12 flex justify-center items-center text-black">
          {getInitials("M V Hemanth")}
        </div>
        <div>
          <p className="text-sm font-medium">Hemanth</p>
          <button
            className="text-sm underline text-slate-700 cursor-pointer"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
