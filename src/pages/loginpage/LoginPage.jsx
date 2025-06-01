// src/pages/loginpage/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/Panel');
    } else {
        alert(data.error || 'خطا در ورود!');
      }
    } catch (err) {
      alert('خطا در ارتباط با سرور!');
    }
  };

  const goBack = () => {
    navigate("/"); // همیشه به صفحه اصلی برگرد
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-6 transform transition-all hover:scale-[1.01]">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          ورود به پنل مدیریت
        </h2>

        <form onSubmit={handleLogin}>
        {/* فرم ورود */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              نام کاربری
            </label>
            <input
              type="text"
              placeholder="نام کاربری"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 dark:text-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              پسورد
            </label>
            <input
              type="password"
              placeholder="پسورد"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
        </div>

        {/* دکمه ها */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between mt-6">
          <button
              type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
            ورود
          </button>

          <button
              type="button"
            onClick={goBack}
            className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-md transition-colors">
            برگشت به صفحه اصلی
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
