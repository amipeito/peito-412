// src/pages/loginpage/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ فقط یک بار وارد شده

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "javad" && password === "135775") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/Panel"); // بدون رفرش
    } else {
      alert("نام کاربری یا پسورد اشتباه است!");
    }
  };

  const goBack = () => {
    navigate("/"); // همیشه به صفحه اصلی برگرد
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6 transform transition-all hover:scale-[1.01]">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          ورود به پنل مدیریت
        </h2>

        {/* فرم ورود */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نام کاربری
            </label>
            <input
              type="text"
              placeholder="نام کاربری"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              پسورد
            </label>
            <input
              type="password"
              placeholder="پسورد"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* دکمه ها */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <button
            onClick={handleLogin}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
            ورود
          </button>

          <button
            onClick={goBack}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors">
            برگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
}
