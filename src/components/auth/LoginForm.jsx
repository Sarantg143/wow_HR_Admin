import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Validate input fields
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password.");
      return;
    }

    // Check credentials
    if (username === "admin" && password === "admin") {
      navigate("/leaders");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="relative w-96 h-[500px] bg-white shadow-[0_0_50px] shadow-[#00A2DF] rounded-2xl p-10 overflow-hidden hover:animate-[animate_3s_linear_infinite]">
        <div className="flex justify-center items-center w-full h-full transition-transform duration-1000 ease-in-out">
          <form onSubmit={handleLogin} className="w-full">
            <div className="text-center mb-5">
              <img
                src={assets.Img.WowHRLogo}
                alt="Logo"
                className="w-48 h-auto mx-auto"
              />
            </div>
            <h2 className="text-3xl text-black text-center mb-8">Login</h2>
            <div className="relative mb-7 border-b-2 border-black">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" Username"
                required
                className="w-full h-10 text-lg text-black bg-transparent outline-none px-1"
              />
            </div>
            <div className="relative mb-7 border-b-2 border-black">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full h-10 text-lg text-black bg-transparent outline-none px-1"
              />
            </div>
            {error && <p className="text-red-500 text-xs mb-3 px-1">{error}</p>}
            <button
              type="submit"
              className="relative w-full h-10 bg-[#00A2DF] shadow-[0_0_10px] shadow-[#00A2DF] text-lg text-black font-medium cursor-pointer rounded-full outline-none"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;