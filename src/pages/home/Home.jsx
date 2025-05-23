import React from "react";
import Navbar from "../navbar/Navbar";
import Parvarsh from "../../assets/images/chool412.jpg";
import Nosher12 from "../../assets/images/nosher12.jpg";
import Newss from "../../assets/images/news.jpg";
import Amir from "../../assets/images/amir.jpg";
import Arseyeha from "../../assets/images/arseyeha.jpg";
import ArefHaji from "../../assets/images/aref-haji.JPG";
import Amirht from "../../assets/images/amirht.jpg";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        {/* بخش اول */}
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8 p-8">
            <div className="md:w-1/2 w-full">
              <div className="relative group overflow-hidden rounded-3xl shadow-lg transition-transform duration-500 hover:scale-105">
                <img
                  src={Parvarsh}
                  alt="هنرستان 412"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 w-full text-right space-y-6">
              <h1 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300">
                اطلاعات اولیه
              </h1>
              <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                این سایت برای ثبت نام اولیه و اطلاعات خاصی راجب هنرستان 412
                نوشیروانی قرار دارد.
              </p>
              <a
                href="/register"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                شروع ثبت نام
              </a>
            </div>
          </div>
        </div>

        {/* بخش دوم */}
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 p-8">
            <div className="md:w-1/2 w-full text-right space-y-6">
              <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300">
                چرا هنرستان نوشیروانی؟
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                با بیش از 20 سال سابقه در زمینه آموزش فنی و حرفه‌ای، ما بهترین
                زیرساخت‌ها و مربیان متخصص را برای آماده‌سازی دانش‌آموزان فراهم
                کرده‌ایم.
              </p>
              <ul className="list-disc pr-6 space-y-2 text-gray-800 dark:text-gray-200">
                <li>رشته‌های متنوع: ساختمان، کامپیوتر</li>
                <li>امکانات روز دنیا در کارگاه‌های آموزشی</li>
                <li>فرصت‌های شغلی بالا پس از فارغ‌التحصیلی</li>
              </ul>
            </div>
            <div className="md:w-1/2 w-full relative group overflow-hidden rounded-3xl shadow-lg transition-transform duration-500 hover:scale-105">
              <img
                src={Nosher12}
                alt="کارگاه‌های آموزشی"
                className="w-full rounded-3xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* بخش سوم */}
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8 p-8">
            <div className="md:w-1/2 w-full">
              <div className="relative group overflow-hidden rounded-3xl shadow-lg transition-transform duration-500 hover:scale-105">
                <img
                  src={Newss}
                  alt="هنرستان 412"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 w-full text-right space-y-6">
              <h1 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300">
                اخبار و اطلاعیه
              </h1>
              <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                خبر و اطلاعیه مهم رو میتوانید با کیلیک بر روی دکمه زیر دنبال
                کنید.
              </p>
              <a
                href="/news"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                برای دیدن کامل اخبار و اطلاعات ....
              </a>
            </div>
          </div>
        </div>

        {/* Footer Section - هم رنگ با سایت */}
        <footer className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-gray-800 dark:to-gray-900 rounded-t-2xl shadow-inner pt-10 pb-6 px-4">
          <div className="container mx-auto text-center">
            <h3 className="text-xl font-bold mb-6 text-blue-900 dark:text-blue-300">
              طراحان این سایت
            </h3>

            <div className="flex flex-wrap justify-center gap-8">
              {/* امیر مهدی بهمرد */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-blue-200 dark:border-gray-600 shadow-md">
                  <img
                    src={Amir}
                    alt="امیر مهدی بهمرد"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  امیر مهدی بهمرد
                </p>
              </div>

              {/* عرشیا گروسی */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-blue-200 dark:border-gray-600 shadow-md">
                  <img
                    src={Arseyeha}
                    alt="عرشیا گروسی"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  عرشیا گروسی
                </p>
              </div>

              {/* امیر حاجی تبار */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-blue-200 dark:border-gray-600 shadow-md">
                  <img
                    src={Amirht}
                    alt="امیر حاجی تبار"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  امیر حاجی تبار
                </p>
              </div>

              {/* عارف حاجی نژاد */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-blue-200 dark:border-gray-600 shadow-md">
                  <img
                    src={ArefHaji}
                    alt="عارف حاجی نژاد"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  عارف حاجی نژاد
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-700 dark:text-gray-300">
              کلیه فرآیندها توسط تیم{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                Front Devs
              </span>{" "}
              که دانش‌آموزان خود هنرستان 412 هستند صورت پذیرفت.
            </p>

            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} هنرستان 412 نوشیروانی. تمامی
              حقوق محفوظ است.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
