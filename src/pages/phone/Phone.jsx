import React from "react";
import Navbar from "../navbar/Navbar";
import { FiPhone, FiUser, FiMessageSquare, FiMapPin } from "react-icons/fi"; // 📦 آیکون‌های React

function Phone() {
  return (
    <>
      <Navbar />

      {/* Container اصلی با پس‌زمینه خفیف */}
      <div
        className="container mx-auto px-4 py-8 text-right bg-blue-50 rounded-lg"
        dir="rtl">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2">
          برای ارتباط با مدرسه
        </h1>

        {/* فقط یک ستون - بدون QR Code */}
        <div className="space-y-8">
          {/* مدرسه */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-semibold text-lg text-blue-700 mb-2 flex items-center gap-2">
              <FiPhone /> تماس مدرسه
            </h2>
            <p className="text-gray-800">
              <span className="font-semibold">شماره مدرسه:</span> ۱۲۷۸۴۵
            </p>
            <p className="text-sm text-gray-600 mt-2">
              برای ثبت نام، مشاوره و اطلاع از آخرین اخبار آموزشی مدرسه.
            </p>
          </div>

          {/* مدیر مدرسه */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-semibold text-lg text-green-700 mb-2 flex items-center gap-2">
              <FiUser /> تماس با مدیر
            </h2>
            <p className="text-gray-800">
              <span className="font-semibold">شماره مدیر:</span> *******۰۹۱۱
            </p>
            <p className="text-sm text-gray-600 mt-2">
              برای درخواست جلسه، همکاری و موارد خاص مدیریتی.
            </p>
          </div>

          {/* کانال ایتا */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-semibold text-lg text-purple-700 mb-2 flex items-center gap-2">
              <FiMessageSquare /> کانال ایتا
            </h2>
            <p className="text-gray-800">
              <span className="font-semibold">ایدی کانال:</span>{" "}
              <a
                href="https://eitaa.com/Honarestan412noshirvani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
                aria-label="کانال ایتا مدرسه 412 نوشیروانی">
                @Honarestan412noshirvani
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              آخرین اخبار، اطلاعیه‌ها و تصاویر فعالیت‌های مدرسه.
            </p>
          </div>

          {/* آدرس مدرسه */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-semibold text-lg text-orange-700 mb-2 flex items-center gap-2">
              <FiMapPin /> آدرس مدرسه
            </h2>
            <p className="text-gray-800">
              <span className="font-semibold">محل مدرسه:</span> بابل، شهید
              بهشتی، خ توحید بیست و هشتم
            </p>
            <p className="text-sm text-gray-600 mt-2">
              برای حضور مستقیم در مدرسه یا ارسال مدارک فیزیکی.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Phone;
