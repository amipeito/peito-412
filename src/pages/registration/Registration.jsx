import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import {
  FaUser,
  FaPhone,
  FaChalkboardTeacher,
  FaIdCard,
  FaHome,
  FaFileImage,
  FaBullseye,
  FaTrophy,
} from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    parentPhone: "",
    field: "",
    nationalCode: "",
    address: "",
    transcript: null,
    guidancePriority: null,
    award: "",
  });

  const [transcriptUploaded, setTranscriptUploaded] = useState(false);
  const [guidanceUploaded, setGuidanceUploaded] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (name === "transcript") setTranscriptUploaded(!!file);
      else if (name === "guidancePriority") setGuidanceUploaded(!!file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    fetch("https://your-api.com/register ", {
      method: "POST",
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("ثبت با موفقیت انجام شد!");
        } else {
          alert("خطا در ثبت فرم!");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("خطا در ارتباط با سرور!");
      });
  };

  return (
    <>
      <Navbar />

      {/* Glassmorphism Background */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-4">
        <div className="backdrop-blur-lg bg-white/60 rounded-2xl shadow-xl max-w-3xl mx-auto p-8 space-y-8">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
            فرم پیش ثبت‌نام دانش‌آموزان
          </h1>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6">
            {/* نام و نام خانوادگی */}
            <div className="flex flex-col">
              <label
                htmlFor="fullName"
                className="font-medium mb-1 text-gray-700 flex items-center gap-2">
                <FaUser className="text-blue-500" /> نام و نام خانوادگی
                دانش‌آموز
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              />
            </div>

            {/* شماره تماس مادر/پدر */}
            <div className="flex flex-col">
              <label
                htmlFor="parentPhone"
                className="font-medium mb-1 text-gray-700 flex items-center gap-2">
                <FaPhone className="text-blue-500" /> شماره تماس همراه مادر/پدر
              </label>
              <input
                type="tel"
                id="parentPhone"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* رشته آموزشی */}
            <div className="flex flex-col">
              <label
                htmlFor="field"
                className="font-medium mb-1 text-gray-700 flex items-center gap-2">
                <FaChalkboardTeacher className="text-blue-500" /> رشته آموزشی
                مورد نظر
              </label>
              <select
                id="field"
                name="field"
                value={formData.field}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none">
                <option value="">انتخاب کنید</option>
                <option value="ساختمان">ساختمان</option>
                <option value="کامپیوتر">کامپیوتر</option>
              </select>
            </div>

            {/* کد ملی */}
            <div className="flex flex-col">
              <label
                htmlFor="nationalCode"
                className="font-medium mb-1 text-gray-700 flex items-center gap-2">
                <FaIdCard className="text-blue-500" /> کد ملی دانش‌آموز
              </label>
              <input
                type="text"
                id="nationalCode"
                name="nationalCode"
                value={formData.nationalCode}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* آدرس محل سکونت */}
            <div className="flex flex-col">
              <label
                htmlFor="address"
                className="font-medium mb-1 text-gray-700 flex items-center gap-2">
                <FaHome className="text-blue-500" /> آدرس دقیق محل سکونت
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"></textarea>
            </div>

            {/* کارنامه تحصیلی */}
            <div className="flex flex-col">
              <label
                htmlFor="transcript"
                className="font-medium mb-1 text-gray-700 flex items-center gap-2">
                <FaFileImage className="text-blue-500" /> اطلاعات کارنامه تحصیلی
                (تصویر)
              </label>
              <input
                type="file"
                id="transcript"
                name="transcript"
                onChange={handleChange}
                accept="image/*"
                required
                className="hidden"
              />
              {!transcriptUploaded ? (
                <button
                  type="button"
                  onClick={() => document.getElementById("transcript").click()}
                  className="w-full sm:w-auto border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  انتخاب فایل
                </button>
              ) : (
                <div className="mt-3 border border-green-300 bg-green-50 text-green-700 px-4 py-2 rounded-md shadow-sm text-sm">
                  عکس دریافت شد
                </div>
              )}
            </div>

            {/* اولویت‌های هدایت تحصیلی */}
            <div className="flex flex-col">
              <label
                htmlFor="guidancePriority"
                className="font-medium mb-1 text-gray-700 flex items-center gap-2">
                <FaBullseye className="text-blue-500" /> اولویت‌های هدایت تحصیلی
                (تصویر)
              </label>
              <input
                type="file"
                id="guidancePriority"
                name="guidancePriority"
                onChange={handleChange}
                accept="image/*"
                required
                className="hidden"
              />
              {!guidanceUploaded ? (
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("guidancePriority").click()
                  }
                  className="w-full sm:w-auto border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  انتخاب فایل
                </button>
              ) : (
                <div className="mt-3 border border-green-300 bg-green-50 text-green-700 px-4 py-2 rounded-md shadow-sm text-sm">
                  عکس دریافت شد
                </div>
              )}
            </div>

            {/* لوح تقدیر یا مقام علمی */}
            <div className="flex flex-col">
              <label
                htmlFor="award"
                className="font-medium mb-1 text-gray-700 flex items-center gap-2">
                <FaTrophy className="text-blue-500" /> لوح تقدیر یا مقام علمی
              </label>
              <input
                type="text"
                id="award"
                name="award"
                value={formData.award}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* دکمه ثبت فرم */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md transform hover:-translate-y-1">
              ثبت فرم
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
