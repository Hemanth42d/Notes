import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Image from "/Images/signUp.png";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter you Name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address...");
      return;
    }

    if (!password) {
      setError("Please enter a valid password...");
      return;
    }
    setError("");

    //SignUp Api Call
    try {
      let response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/signUp`,
        {
          email: email,
          password: password,
          fullName: fullName,
        },
        { withCredentials: true }
      );
      if (response.data && response.data.accessToken) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div className="flex justify-evenly items-center flex-col h-screen w-screen">
        <NavBar />

        <div className="w-[75vw] m-auto h-3/4 flex justify-center items-center">
          <div className="w-2/4 h-full flex justify-center items-center ">
            <img src={Image} alt="loginImage" className="h-2/4" />
          </div>
          <div className="w-2/4 h-full flex justify-center items-center">
            <div className="h-[55vh] shadow-xl w-4/6 m-auto border-1 border-gray-300 rounded-md py-4 px-6">
              <form action="" onSubmit={handleSignUp}>
                <h1 className=" text-2xl text-left mt-5 ">SignUp</h1>

                <input
                  type="text"
                  placeholder="Name"
                  className="bg-white border-1 px-4 border-gray-300 w-full text-sm outline-none p-2 mt-8 rounded-md"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white border-1 px-4 border-gray-300 w-full text-sm outline-none p-2 mt-4 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-xs pb-1 ">{error}</p>}

                <button
                  type="submit"
                  className="w-full mt-5 text-sm bg-[#2BB5FF] text-white p-2 rounded-md my-1 hover:bg-blue-600 cursor-pointer"
                >
                  Create Account
                </button>

                <p className="text-sm text-center mt-4">
                  Already have an Account ?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-[#2BB5FF] underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
