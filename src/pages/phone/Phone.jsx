import React from "react";
import Navbar from "../navbar/Navbar";
import {
  FiPhone,
  FiUser,
  FiMessageSquare,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";

function Phone() {
  return (
    <>
      <Navbar />

      {/* Container اصلی با پس‌زمینه خفیف */}
      <div
        className="container mx-auto px-4 py-8 text-right bg-blue-50 dark:bg-gray-900 dark:text-gray-200 rounded-lg transition-colors duration-300"
        dir="rtl">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 dark:text-blue-300 border-b pb-2">
          برای ارتباط با مدرسه
        </h1>

        {/* فقط یک ستون - بدون QR Code */}
        <div className="space-y-8">
          {/* اتاق مدیر */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-lg text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
              <FiUser /> تماس با اتاق مدیر
            </h2>
            <p className="text-gray-800 dark:text-gray-200">
              <span className="font-semibold">شماره اتاق مدیر: </span>1132339411
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              برای ارتباط مستقیم با مدیر مدرسه و مسائل مهم.
            </p>
          </div>

          {/* مدیر مدرسه */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-lg text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
              <FiUser /> تماس با معاون آموزشی
            </h2>
            <p className="text-gray-800 dark:text-gray-200">
              <span className="font-semibold">شماره معاون آموزشی: </span>
              1132332626
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              برای درخواست جلسه، همکاری و موارد خاص مدیریتی و برای ثبت نام،
              مشاوره و اطلاع از آخرین اخبار آموزشی مدرسه.
            </p>
          </div>

          {/* معاون فنی */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-lg text-yellow-700 dark:text-yellow-400 mb-2 flex items-center gap-2">
              <FiBriefcase /> تماس با معاون فنی
            </h2>
            <p className="text-gray-800 dark:text-gray-200">
              <span className="font-semibold">شماره معاون فنی: </span>1132369303
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              برای مشاوره فنی، تعمیرات و خدمات مربوط به دستگاه‌ها و سخت‌افزار.
            </p>
          </div>

          {/* کانال ایتا */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-lg text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
              <FiMessageSquare /> کانال ایتا
            </h2>
            <p className="text-gray-800 dark:text-gray-200">
              <span className="font-semibold">ایدی کانال:</span>{" "}
              <a
                href="https://eitaa.com/Honarestan412noshirvani "
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline"
                aria-label="کانال ایتا مدرسه 412 نوشیروانی">
                @Honarestan412noshirvani
              </a>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              آخرین اخبار، اطلاعیه‌ها و تصاویر فعالیت‌های مدرسه.
            </p>
          </div>

          {/* آدرس مدرسه */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-lg text-orange-700 dark:text-orange-400 mb-2 flex items-center gap-2">
              <FiMapPin /> آدرس مدرسه
            </h2>
            <p className="text-gray-800 dark:text-gray-200">
              <span className="font-semibold">محل مدرسه:</span> استان مازندران
              شهرستان بابل خیابان مدرس روبروی پلازا
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <span className="font-semibold">کد پستی:</span> 4714639577
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              برای حضور مستقیم در مدرسه یا ارسال مدارک فیزیکی.
            </p>
          </div>

          {/* حساب بانکی مدرسه */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-lg text-teal-700 dark:text-teal-400 mb-2 flex items-center gap-2">
              <FiBriefcase /> حساب بانکی مدرسه
            </h2>
            <p className="text-gray-800 dark:text-gray-200">
              <span className="font-semibold">
                شماره حساب مدرسه (بانک ملی ایران):
              </span>{" "}
              4150155501001
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <span className="font-semibold">شماره کارت مجازی هنرستان:</span>{" "}
              6037991899633592
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              برای کمک و حمایت مالی مدرسه.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Phone;
