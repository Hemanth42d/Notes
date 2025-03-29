import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import image from "/Images/undraw_login_weas.svg";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address...");
      return;
    }

    if (!password) {
      setError("Please enter a valid password...");
      return;
    }

    setError("");

    //Login Api Call
  };

  return (
    <>
      <div className="flex justify-evenly items-center flex-col h-screen w-screen">
        <NavBar />

        <div className="w-[75vw] m-auto h-3/4 flex justify-center items-center">
          <div className="w-2/4 h-full flex justify-center items-center ">
            <img src={image} alt="loginImage" className="h-2/4" />
          </div>
          <div className="w-2/4 h-full flex justify-center items-center">
            <div className="h-[48vh] shadow-xl w-4/6 m-auto border-1 border-gray-300 rounded-md py-4 px-6">
              <form action="" onSubmit={handleLogin}>
                <h1 className=" text-2xl text-left mt-5 ">Login</h1>
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white border-1 px-4 border-gray-300 w-full text-sm outline-none p-2 mt-8 rounded-md"
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
                  Login
                </button>

                <p className="text-sm text-center mt-4">
                  Not registered Yet ?{" "}
                  <Link
                    to="/SignUp"
                    className="font-medium text-[#2BB5FF] underline"
                  >
                    Create an Account
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

export default Login;
