// src/pages/panel/Panel.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

export default function Panel() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // شبیه‌سازی دریافت داده از API
  useEffect(() => {
    setTimeout(() => {
      setRegistrations([
        {
          id: 1,
          fullName: "علی محمدی",
          parentPhone: "09123456789",
          field: "کامپیوتر",
          nationalCode: "0011223344",
          address: "تهران، خیابان ولی عصر، پلاک ۱۲۳",
          award: "مقام اول المپیاد کامپیوتر",
          transcript: "https://via.placeholder.com/150x80?text= كارنامه+علی",
          guidancePriority:
            "https://via.placeholder.com/150x80?text= اولويت+هدایت+علی",
        },
        {
          id: 2,
          fullName: "رضا احمدی",
          parentPhone: "09369876543",
          field: "ساختمان",
          nationalCode: "1122334455",
          address: "اصفهان، خیابان طالقانی، پلاک ۴۵",
          award: "",
          transcript: "https://via.placeholder.com/150x80?text= كارنامه+سارا",
          guidancePriority:
            "https://via.placeholder.com/150x80?text= اولويت+هدایت+سارا",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6 font-vazir transition-colors duration-300">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              پنل مدیریت
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded transition w-full md:w-auto">
              خروج
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            لیست ثبت‌نام‌ها
          </h2>

          {loading ? (
            <p className="text-center py-4 dark:text-gray-300">
              در حال بارگذاری...
            </p>
          ) : registrations.length === 0 ? (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              هیچ ثبت‌نامی یافت نشد.
            </p>
          ) : (
            <>
              {/* نمایش برای دسکتاپ - جدول */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full table-auto border-collapse text-right">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      <th className="border dark:border-gray-600 px-4 py-2">
                        #
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        نام و نام خانوادگی
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        شماره تماس
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        رشته
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        کد ملی
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        آدرس
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        کارنامه
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        اولویت هدایت
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        لوح تقدیر / مقام
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                    {registrations.map((user, index) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="border dark:border-gray-600 px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200">
                          {user.fullName}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200">
                          {user.parentPhone}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-blue-400">
                          {user.field}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200">
                          {user.nationalCode}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200">
                          {user.address}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2">
                          {user.transcript ? (
                            <a
                              href={user.transcript}
                              target="_blank"
                              rel="noopener noreferrer">
                              <img
                                src={user.transcript}
                                alt="کارنامه"
                                className="w-24 h-auto object-cover rounded border dark:border-gray-600"
                              />
                            </a>
                          ) : (
                            <span className="dark:text-gray-400">ندارد</span>
                          )}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2">
                          {user.guidancePriority ? (
                            <a
                              href={user.guidancePriority}
                              target="_blank"
                              rel="noopener noreferrer">
                              <img
                                src={user.guidancePriority}
                                alt="اولویت هدایت"
                                className="w-24 h-auto object-cover rounded border dark:border-gray-600"
                              />
                            </a>
                          ) : (
                            <span className="dark:text-gray-400">ندارد</span>
                          )}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200">
                          {user.award || (
                            <span className="dark:text-gray-400">ندارد</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* نمایش برای موبایل - کارتی */}
              <div className="block md:hidden space-y-4">
                {registrations.map((user) => (
                  <div
                    key={user.id}
                    className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-4 shadow-sm">
                    <div className="space-y-2">
                      <p>
                        <strong className="dark:text-gray-300">نام:</strong>{" "}
                        <span className="dark:text-gray-200">
                          {user.fullName}
                        </span>
                      </p>
                      <p>
                        <strong className="dark:text-gray-300">
                          شماره تماس:
                        </strong>{" "}
                        <span className="dark:text-gray-200">
                          {user.parentPhone}
                        </span>
                      </p>
                      <p>
                        <strong className="dark:text-gray-300">رشته:</strong>{" "}
                        <span className="dark:text-blue-300">{user.field}</span>
                      </p>
                      <p>
                        <strong className="dark:text-gray-300">کد ملی:</strong>{" "}
                        <span className="dark:text-gray-200">
                          {user.nationalCode}
                        </span>
                      </p>
                      <p>
                        <strong className="dark:text-gray-300">آدرس:</strong>{" "}
                        <span className="dark:text-gray-200">
                          {user.address}
                        </span>
                      </p>
                      <p>
                        <strong className="dark:text-gray-300">کارنامه:</strong>
                        {user.transcript ? (
                          <a
                            href={user.transcript}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-1">
                            <img
                              src={user.transcript}
                              alt="کارنامه"
                              className="w-full max-w-xs h-auto object-cover rounded border dark:border-gray-600"
                            />
                          </a>
                        ) : (
                          <span className="text-gray-400 block mt-1 dark:text-gray-400">
                            ندارد
                          </span>
                        )}
                      </p>
                      <p>
                        <strong className="dark:text-gray-300">
                          اولویت هدایت:
                        </strong>
                        {user.guidancePriority ? (
                          <a
                            href={user.guidancePriority}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-1">
                            <img
                              src={user.guidancePriority}
                              alt="اولویت هدایت"
                              className="w-full max-w-xs h-auto object-cover rounded border dark:border-gray-600"
                            />
                          </a>
                        ) : (
                          <span className="text-gray-400 block mt-1 dark:text-gray-400">
                            ندارد
                          </span>
                        )}
                      </p>
                      <p>
                        <strong className="dark:text-gray-300">
                          لوح تقدیر:
                        </strong>{" "}
                        <span className="dark:text-gray-200">
                          {user.award || (
                            <span className="dark:text-gray-400">ندارد</span>
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
