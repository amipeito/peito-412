import React from "react";
import Navbar from "../navbar/Navbar";
import photo from "../../assets/images/photo_2025-05-01_07-46-00.jpg";
import { LuFlower2 } from "react-icons/lu";

function About() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-6 font-vazir dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300 min-h-screen">
        {/* عنوان اصلی */}
        <h1 className="text-2xl font-semibold mb-8 text-center">
          اطلاعاتی درمورد پیش ثبت نام و تاریخ مدرسه در اینجا قرار دارد
        </h1>

        {/* بخش‌های محتوا */}
        <div className="flex flex-col gap-10 md:grid grid-cols-2">
          {/* بخش پیش ثبت نام */}
          <section className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-500 dark:text-blue-400 border-b pb-2 mb-4">
              نوع پیش ثبت نام:
            </h2>
            <p className="leading-relaxed mb-4">
              فرآیند پیش ثبت نام از طریق یک فرم الکترونیکی انجام می‌شود که
              اطلاعات ضروری زیر را در بر می‌گیرد:
            </p>
            <ul className="list-disc pr-5 space-y-2">
              <li>نام و نام خانوادگی دانش‌آموز</li>
              <li>شماره تماس همراه مادر/پدر</li>
              <li>رشته آموزشی مورد نظر (ساختمان، کامپیوتر)</li>
              <li>کد ملی دانش‌آموز</li>
              <li>آدرس دقیق محل سکونت</li>
              <li>اطلاعات کارنامه تحصیلی دانش‌آموز</li>
              <li>
                اولویت‌های هدایت تحصیلی یا نیازهای خاص آموزشی (در صورت وجود)
              </li>
              <li>اطلاعات مربوط به داشتن لوح تقدیر یا مقام علمی</li>
            </ul>
            <p className="leading-relaxed mt-4">
              پس از ثبت موفقیت‌آمیز فرم، تیم مدرسه از طریق تماس تلفنی یا پیامک
              در خصوص مراحل بعدی اقدام خواهد کرد.
            </p>
          </section>

          {/* بخش تاریخچه مدرسه */}
          <section className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-500 dark:text-blue-400 border-b pb-2 mb-4">
              تاریخچه و ارزش آموزشی مدرسه
            </h2>
            <p className="leading-relaxed mb-4">
              <span className="font-semibold">هنرستان نوشیروانی بابل</span> در
              استان مازندران، یکی از مراکز برتر آموزش فنی و حرفه‌ای در منطقه
              شمال کشور محسوب می‌شود. این مدرسه با سال‌ها تجربه در زمینه آموزش
              تخصصی، دانش‌آموزان را در رشته‌های زیر آماده می‌کند:
            </p>
            <ul className="list-disc pr-5 space-y-2 mb-4">
              <li>فنی ساختمان (با تأکید بر ساخت و ساز و مدیریت پروژه)</li>
              <li>کامپیوتر (با محوریت خدمات شبکه و توسعه نرم‌افزار)</li>
            </ul>
            <p className="leading-relaxed">
              <span className="font-semibold">آقای جواد غلامپور</span> به عنوان
              مدیر مدرسه، سال‌هاست با تلاش بی‌وقفه راهبرد آموزشی این مجموعه را
              بهبود می‌بخشد. والدین گرامی می‌توانند از طریق این وب‌سایت:
            </p>
            <ul className="list-disc pr-5 mt-3 space-y-2">
              <li>برای مشاوره تحصیلی دانش‌آموزان خود درخواست دهند</li>
              <li>مراحل پیش ثبت‌نام را به صورت آنلاین پیگیری کنند</li>
              <li>با امکانات و برنامه‌های آموزشی مدرسه آشنا شوند</li>
            </ul>
          </section>
        </div>

        {/* بخش عکس */}
        <div className="mt-12 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center justify-center gap-2 dark:text-blue-300">
            هنرجویان برتر امتحانات نیمسال اول دیماه
            <LuFlower2 />
          </h1>
          <div className="flex justify-center">
            <img
              src={photo}
              alt="هنرجویان برتر"
              className="max-w-full h-auto rounded-lg shadow-lg dark:shadow-gray-700"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
