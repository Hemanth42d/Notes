import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    console.log("lgoout clicked");
    navigate("/login");
  };

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <div className="border-1 border-gray-300 shadow-md h-20 w-full flex justify-between items-center px-6">
        <h1 className=" text-2xl ">Notes</h1>

        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </>
  );
};

export default NavBar;
