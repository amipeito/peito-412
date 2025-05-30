import React from "react";
import Navbar from "../navbar/Navbar";
import Image1 from "../../assets/images/l1.jpg";
import Image2 from "../../assets/images/l2.jpg";
import Image3 from "../../assets/images/l3.jpg";

function News() {
  // اطلاعیه‌های هنرستان
  const announcements = [
    {
      title: "ثبت نام دانش‌آموزان پایه دهم",
      description:
        "ثبت نام دانش‌آموزان جدید برای رشته‌های فنی و حرفه‌ای سال تحصیلی 1404-1403 از تاریخ 15 تیرماه تا پایان شهریورماه انجام می‌شود.",
    },
    {
      title: "برگزاری امتحانات نوبت دوم",
      description:
        "امتحانات پایانی نوبت دوم دانش‌آموزان هنرستان 412 نوشیروانی از تاریخ 3 خرداد ماه آغاز می‌شود. جدول زمانی امتحانات در سایت مدرسه منتشر شده است.",
    },
    {
      title: "برگزاری امتحان راس ساعت 8 صبح",
      description:
        "تمامی جلسات امتحانی از ساعت 8 صبح به مدت 90 دقیقه برگزار خواهد شد. دانش‌آموزان موظف به رعایت وقت هستند.",
    },
  ];

  // اخبار هنرستان
  const newsItems = [
    {
      title: "انتصاب مدیریت جدید و تجلیل از مدیریت سابق هنرستان",
      description:
        "با حضور مسئولین شهرستانی و استانی مراسم معارفه آقای جواد غلامپور صورت پذیرفت و از مدیریت سابق هنرستان از آقای حیدر قلی نیا تجلیل به عمل آمد.",
      image: Image1,
    },
    {
      title: "پادگان شهید بزاز اردوی درس آمادگی دفاعی پایه دوازدهم",
      description:
        "این اردوی نیم روزه دانش آموزان پایه دوازدهم  به صورت هماهنگ با دیگر مدارس در پادگان شهید بزاز بابل با همکاری آموزش و پرورش برگزار شد.",
      image: Image2,
    },
    {
      title: "در روز معلم طی جشنی از معلمان و همکاران هنرستان تقدیر شد.",
      description:
        "در راستای پاسداشت روز معلم طی یک مراسمی در روز سه شنبه ۱۶ اردیبهشت از هنرآموزان و معلمان و کادر اداری هنرستان ساختمان تجلیل و تقدیر به عمل آمد .",
      image: Image3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
      <Navbar />

      {/* بنر بالایی */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            اخبار و اطلاعیه‌های دانش‌آموزی
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* قسمت اطلاعیه */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 border-b-2 border-blue-300 dark:border-blue-700 pb-2 mb-6">
            اطلاعیه‌ها
          </h2>

          <div className="space-y-5">
            {announcements.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* قسمت اخبار - ردیفی (vertical) */}
        <section>
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 border-b-2 border-green-300 dark:border-green-700 pb-2 mb-6">
            اخبار
          </h2>

          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1">
                {/* تصویر روی همه عرض */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover"
                />
                {/* محتوای زیر تصویر */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default News;
