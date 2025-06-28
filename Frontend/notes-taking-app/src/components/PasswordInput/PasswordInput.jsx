import { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShownPassword, setIsShownPassword] = useState(false);

  const toggleShownPassword = () => {
    setIsShownPassword(!isShownPassword);
  };

  return (
    <div className="flex bg-transparent items-center rounded mb-1 relative">
      <input
        value={value}
        onChange={onChange}
        type={isShownPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="bg-white border-1 px-4 border-gray-300 w-full text-sm outline-none p-2 mt-4 rounded-md"
      />

      {isShownPassword ? (
        <FaRegEye
          role="button"
          tabIndex={0}
          size={22}
          className="text-[#2BB5FF] cursor-pointer absolute right-2 top-6"
          onClick={toggleShownPassword}
        />
      ) : (
        <FaRegEyeSlash
          role="button"
          tabIndex={0}
          size={22}
          className="text-slate-400 cursor-pointer absolute right-2 top-6"
          onClick={toggleShownPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
