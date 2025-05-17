import React from "react";
import Navbar from "../navbar/Navbar";
import Parvarsh from "../../assets/images/parvarsh.jpg";
import Nosher12 from "../../assets/images/nosher12.jpg";
function Home() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        {/* بخش اول با پس‌زمینه آبی-سمانی */}
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8 p-8">
            {/* عکس - سمت چپ */}
            <div className="md:w-1/2 w-full">
              <div className="relative group overflow-hidden rounded-3xl shadow-lg transition-transform duration-500 hover:scale-105">
                <img
                  src={Parvarsh}
                  alt="هنرستان 412"
                  className="w-full h-auto object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* متن - سمت راست */}
            <div className="md:w-1/2 w-full text-right space-y-6">
              <h1 className="text-4xl font-extrabold text-blue-800 bg-clip-text">
                اطلاعات اولیه
              </h1>
              <p className="text-lg text-gray-800 leading-relaxed">
                این سایت برای ثبت نام اولیه و اطلاعات خاصی راجب هنرستان 412
                نوشیروانی قرار دارد.
              </p>
              <div className="mt-4">
                <a
                  href="/register"
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                  شروع ثبت نام
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* بخش دوم با پس‌زمینه مشابه */}
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 p-8">
            {/* متن - سمت چپ */}
            <div className="md:w-1/2 w-full text-right space-y-6">
              <h2 className="text-3xl font-bold text-blue-800">
                چرا هنرستان نوشیروانی؟
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                با بیش از 20 سال سابقه در زمینه آموزش فنی و حرفه‌ای، ما بهترین
                زیرساخت‌ها و مربیان متخصص را برای آماده‌سازی دانش‌آموزان فراهم
                کرده‌ایم.
              </p>
              <ul className="list-disc pr-6 space-y-2 text-gray-800">
                <li>رشته‌های متنوع: ساختمان، کامپیوتر</li>
                <li>امکانات روز دنیا در کارگاه‌های آموزشی</li>
                <li>فرصت‌های شغلی بالا پس از فارغ‌التحصیلی</li>
              </ul>
            </div>

            {/* عکس - سمت راست (همین لینک قبلی) */}
            <div className="md:w-1/2 w-full relative group overflow-hidden rounded-3xl shadow-lg transition-transform duration-500 hover:scale-105">
              <img
                src={Nosher12}
                alt="کارگاه‌های آموزشی"
                className="w-full rounded-3xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
