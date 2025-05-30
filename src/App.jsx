/** @format */

import React, {useState, useEffect} from "react";
import {Route, Routes} from "react-router-dom";

// صفحات
import LoginPage from "./pages/loginpage/LoginPage";
import Panel from "./pages/panel/Panel";
import Home from "./pages/home/Home";
import Phone from "./pages/phone/Phone";
import About from "./pages/about/About";
import Registration from "./pages/registration/Registration";
import News from "./pages/news/News";
import Notfound from "./pages/notfound/Notfound";
// PrivateRoute برای صفحات امن
import PrivateRoute from "./components/PrivateRoute";

// آیکون‌ها
import {MdDarkMode, MdLightMode} from "react-icons/md";

function App() {
  // ✅ بررسی localStorage برای ذخیره وضعیت
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  // ✅ افزودن یا حذف کلاس dark روی html tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // ذخیره وضعیت فعلی در localStorage
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className='min-h-screen text-gray-900 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 dark:text-gray-100'>
      <Routes>
        {/* صفحات عمومی */}
        <Route path='/' element={<Home />} />
        <Route path='/news' element={<News />} />
        <Route path='/phone' element={<Phone />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Registration />} />

        {/* صفحات اختصاصی */}
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/panel'
          element={
            <PrivateRoute>
              <Panel />
            </PrivateRoute>
          }
        />

        {/* صفحه 404 */}
        <Route path='*' element={<Notfound />} />
      </Routes>

      {/* دکمه تغییر تم */}
      <button
        onClick={toggleDarkMode}
        className='fixed z-50 p-3 transition-all duration-300 bg-gray-200 rounded-full shadow-lg bottom-4 right-4 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
        aria-label='تغییر تم'
      >
        {isDarkMode ? (
          <MdLightMode size={24} className='text-yellow-300' />
        ) : (
          <MdDarkMode size={24} className='text-gray-700' />
        )}
      </button>
    </div>
  );
}

export default App;
