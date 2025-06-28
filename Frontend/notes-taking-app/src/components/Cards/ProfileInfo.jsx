import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
  if (!userInfo) return null;

  return (
    <>
      <div className="flex items-center gap-3">
        <div className=" text-sm rounded-full bg-slate-300 w-12 h-12 flex justify-center items-center text-black">
          {getInitials(userInfo.fullName)}
        </div>
        <div>
          <p className="text-sm font-medium">{userInfo.fullName}</p>
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
