import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300"
      dir="rtl">
      <div className="container mx-auto px-4 py-3 font-vazir">
        {/* Grid layout */}
        <div className="grid grid-cols-12 items-center gap-4">
          {/* لوگو / عنوان */}
          <div className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            هنرستان 412
          </div>

          {/* منوی دسکتاپ */}
          <ul className="hidden md:flex md:col-span-7 lg:col-span-8 space-x-2 rtl:space-x-reverse justify-end text-right text-gray-700 dark:text-gray-200">
            {[
              { name: "خانه", path: "/" },
              { name: "اخبار و اطلاعیه", path: "/news" },
              { name: "درباره", path: "/about" },
              { name: "تماس", path: "/phone" },
              { name: "ثبت نام", path: "/register" },
              { name: "پنل مدیریت", path: "/Panel", special: true }, // برچسب خاص
            ].map((item) => (
              <li key={item.path} className={item.special ? "mr-6" : ""}>
                <Link
                  to={item.path}
                  className={`relative no-underline transition-all duration-300 group ${
                    item.special
                      ? "text-red-500 font-bold"
                      : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}>
                  {/* Highlight زیر متن */}
                  <span className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 rounded-md transition-all duration-300"></span>
                  {/* متن لینک */}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* باتن منوی موبایل */}
          <div className="md:hidden col-span-6 flex justify-start">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label="Toggle menu">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* منوی موبایل */}
        <div
          className={`${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
          <ul className="mt-2 pb-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2 rtl:space-y-reverse text-right text-gray-700 dark:text-gray-200 px-2">
            {[
              { name: "خانه", path: "/" },
              { name: "اخبار و اطلاعیه", path: "/news" },
              { name: "درباره", path: "/about" },
              { name: "تماس", path: "/phone" },
              { name: "ثبت نام", path: "/register" },
              { name: "پنل مدیریت", path: "/Panel", special: true }, // برچسب خاص
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition no-underline ${
                    item.special ? "text-red-500 font-bold" : ""
                  }`}
                  onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
