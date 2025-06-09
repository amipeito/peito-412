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

      {/* Container اصلی با گرادیانت مشابه Home */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden p-8" dir="rtl">
          <h1 className="text-3xl font-bold mb-8 text-blue-800 dark:text-blue-300 border-b border-blue-100 dark:border-gray-700 pb-4">
            اطلاعات تماس هنرستان
          </h1>

          <div className="grid gap-6">
            {/* اتاق مدیر */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h2 className="font-bold text-xl text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                <FiUser className="text-2xl" /> دفتر مدیریت
              </h2>
              <div className="space-y-2">
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">شماره تماس: </span>1132339411
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  برای ارتباط مستقیم با مدیر مدرسه و مسائل مهم
                </p>
              </div>
            </div>

            {/* معاون آموزشی */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h2 className="font-bold text-xl text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                <FiUser className="text-2xl" /> معاونت آموزشی
              </h2>
              <div className="space-y-2">
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">شماره تماس: </span>1132332626
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  برای ثبت نام، مشاوره و اطلاع از آخرین اخبار آموزشی مدرسه
                </p>
              </div>
            </div>

            {/* معاون فنی */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h2 className="font-bold text-xl text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                <FiBriefcase className="text-2xl" /> معاونت فنی
              </h2>
              <div className="space-y-2">
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">شماره تماس: </span>1132369303
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  برای مشاوره فنی، تعمیرات و خدمات مربوط به دستگاه‌ها و سخت‌افزار
                </p>
              </div>
            </div>

            {/* کانال ایتا */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h2 className="font-bold text-xl text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                <FiMessageSquare className="text-2xl" /> کانال ایتا
              </h2>
              <div className="space-y-2">
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">آدرس کانال: </span>
                  <a
                    href="https://eitaa.com/Honarestan412noshirvani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline">
                    @Honarestan412noshirvani
                  </a>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  آخرین اخبار، اطلاعیه‌ها و تصاویر فعالیت‌های مدرسه
                </p>
              </div>
            </div>

            {/* آدرس مدرسه */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h2 className="font-bold text-xl text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                <FiMapPin className="text-2xl" /> آدرس مدرسه
              </h2>
              <div className="space-y-2">
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">نشانی: </span>
                  استان مازندران شهرستان بابل خیابان مدرس روبروی پلازا
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">کد پستی: </span>4714639577
                </p>
              </div>
            </div>

            {/* حساب بانکی */}
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h2 className="font-bold text-xl text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                <FiBriefcase className="text-2xl" /> اطلاعات حساب بانکی
              </h2>
              <div className="space-y-2">
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">شماره حساب (بانک ملی): </span>4150155501001
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">شماره کارت مجازی: </span>6037991899633592
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  جهت کمک و حمایت مالی از هنرستان
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Phone;
