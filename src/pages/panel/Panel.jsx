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
      <div className="min-h-screen bg-gray-100 p-4 md:p-6 font-vazir">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
              پنل مدیریت
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition w-full md:w-auto">
              خروج
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-4">لیست ثبت‌نام‌ها</h2>

          {loading ? (
            <p className="text-center py-4">در حال بارگذاری...</p>
          ) : registrations.length === 0 ? (
            <p className="text-center py-4 text-gray-500">
              هیچ ثبت‌نامی یافت نشد.
            </p>
          ) : (
            <>
              {/* نمایش برای دسکتاپ - جدول */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full table-auto border-collapse text-right">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="border px-4 py-2">#</th>
                      <th className="border px-4 py-2">نام و نام خانوادگی</th>
                      <th className="border px-4 py-2">شماره تماس</th>
                      <th className="border px-4 py-2">رشته</th>
                      <th className="border px-4 py-2">کد ملی</th>
                      <th className="border px-4 py-2">آدرس</th>
                      <th className="border px-4 py-2">کارنامه</th>
                      <th className="border px-4 py-2">اولویت هدایت</th>
                      <th className="border px-4 py-2">لوح تقدیر / مقام</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {registrations.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{user.fullName}</td>
                        <td className="border px-4 py-2">{user.parentPhone}</td>
                        <td className="border px-4 py-2">{user.field}</td>
                        <td className="border px-4 py-2">
                          {user.nationalCode}
                        </td>
                        <td className="border px-4 py-2">{user.address}</td>
                        <td className="border px-4 py-2">
                          {user.transcript ? (
                            <a
                              href={user.transcript}
                              target="_blank"
                              rel="noopener noreferrer">
                              <img
                                src={user.transcript}
                                alt="کارنامه"
                                className="w-24 h-auto object-cover rounded border"
                              />
                            </a>
                          ) : (
                            <span className="text-gray-400">ندارد</span>
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {user.guidancePriority ? (
                            <a
                              href={user.guidancePriority}
                              target="_blank"
                              rel="noopener noreferrer">
                              <img
                                src={user.guidancePriority}
                                alt="اولویت هدایت"
                                className="w-24 h-auto object-cover rounded border"
                              />
                            </a>
                          ) : (
                            <span className="text-gray-400">ندارد</span>
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {user.award || (
                            <span className="text-gray-400">ندارد</span>
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
                    className="bg-gray-50 border rounded-lg p-4 shadow-sm">
                    <div className="space-y-2">
                      <p>
                        <strong>نام:</strong> {user.fullName}
                      </p>
                      <p>
                        <strong>شماره تماس:</strong> {user.parentPhone}
                      </p>
                      <p>
                        <strong>رشته:</strong> {user.field}
                      </p>
                      <p>
                        <strong>کد ملی:</strong> {user.nationalCode}
                      </p>
                      <p>
                        <strong>آدرس:</strong> {user.address}
                      </p>
                      <p>
                        <strong>کارنامه:</strong>
                        {user.transcript ? (
                          <a
                            href={user.transcript}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-1">
                            <img
                              src={user.transcript}
                              alt="کارنامه"
                              className="w-full max-w-xs h-auto object-cover rounded border"
                            />
                          </a>
                        ) : (
                          <span className="text-gray-400 block mt-1">
                            ندارد
                          </span>
                        )}
                      </p>
                      <p>
                        <strong>اولویت هدایت:</strong>
                        {user.guidancePriority ? (
                          <a
                            href={user.guidancePriority}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-1">
                            <img
                              src={user.guidancePriority}
                              alt="اولویت هدایت"
                              className="w-full max-w-xs h-auto object-cover rounded border"
                            />
                          </a>
                        ) : (
                          <span className="text-gray-400 block mt-1">
                            ندارد
                          </span>
                        )}
                      </p>
                      <p>
                        <strong>لوح تقدیر:</strong>{" "}
                        {user.award || (
                          <span className="text-gray-400">ندارد</span>
                        )}
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
