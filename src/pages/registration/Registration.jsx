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
  const [errors, setErrors] = useState({});

  // اعتبارسنجی شماره تماس
  const validatePhoneNumber = (value) => {
    return value.length === 11 && /^\d+$/.test(value);
  };

  // اعتبارسنجی کد ملی
  const validateNationalCode = (value) => {
    return value.length === 10 && /^\d+$/.test(value);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (name === "transcript") setTranscriptUploaded(!!file);
      else if (name === "guidancePriority") setGuidanceUploaded(!!file);
    } else {
      let newValue = value;
      if (name === "fullName") {
        // حذف همه کاراکترها به جز حروف فارسی و فاصله
        newValue = value.replace(/[^آ-ی\s]/g, "");
      } else if (name === "parentPhone") {
        newValue = value.slice(0, 11); // حداکثر 11 رقم
      } else if (name === "nationalCode") {
        newValue = value.slice(0, 10); // حداکثر 10 رقم
      } else if (["address", "award"].includes(name)) {
        newValue = value.slice(0, 2250); // حداکثر 2250 کاراکتر (~15 خط)
      }
      setFormData((prev) => ({ ...prev, [name]: newValue }));

      // اعتبارسنجی زنده
      if (name === "fullName") {
        setErrors((prev) => ({
          ...prev,
          fullName:
            newValue.length < 3
              ? "نام و نام خانوادگی باید حداقل 3 حرف باشد"
              : "",
        }));
      } else if (name === "parentPhone") {
        setErrors((prev) => ({
          ...prev,
          parentPhone: validatePhoneNumber(newValue)
            ? ""
            : "شماره تماس باید 11 رقم باشد.",
        }));
      } else if (name === "nationalCode") {
        setErrors((prev) => ({
          ...prev,
          nationalCode: validateNationalCode(newValue)
            ? ""
            : "کد ملی باید 10 رقم باشد.",
        }));
      } else if (name === "address") {
        setErrors((prev) => ({
          ...prev,
          address:
            newValue.length >= 2250 ? "آدرس محل سکونت حداکثر 15 خط است." : "",
        }));
      } else if (name === "award") {
        setErrors((prev) => ({
          ...prev,
          award: newValue.length >= 2250 ? "لوح تقدیر حداکثر 15 خط است." : "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let isValid = true;

    // بررسی نام و نام خانوادگی
    if (!formData.fullName || formData.fullName.length < 3) {
      setErrors((prev) => ({
        ...prev,
        fullName: "نام و نام خانوادگی باید حداقل 3 حرف باشد",
      }));
      isValid = false;
    }

    // بررسی شماره تماس
    if (!formData.parentPhone || !validatePhoneNumber(formData.parentPhone)) {
      setErrors((prev) => ({
        ...prev,
        parentPhone: "شماره تماس باید 11 رقم باشد.",
      }));
      isValid = false;
    }

    // بررسی رشته آموزشی
    if (!formData.field) {
      setErrors((prev) => ({
        ...prev,
        field: "لطفاً رشته آموزشی را انتخاب کنید",
      }));
      isValid = false;
    }

    // بررسی کد ملی
    if (
      !formData.nationalCode ||
      !validateNationalCode(formData.nationalCode)
    ) {
      setErrors((prev) => ({
        ...prev,
        nationalCode: "کد ملی باید 10 رقم باشد.",
      }));
      isValid = false;
    }

    // بررسی آدرس
    if (!formData.address) {
      setErrors((prev) => ({
        ...prev,
        address: "لطفاً آدرس را وارد کنید",
      }));
      isValid = false;
    } else if (formData.address.length >= 2250) {
      setErrors((prev) => ({
        ...prev,
        address: "آدرس محل سکونت حداکثر 15 خط است.",
      }));
      isValid = false;
    }

    // بررسی فایل‌های آپلودی
    if (!formData.transcript) {
      setErrors((prev) => ({
        ...prev,
        transcript: "لطفاً کارنامه تحصیلی را آپلود کنید",
      }));
      isValid = false;
    }

    if (!formData.guidancePriority) {
      setErrors((prev) => ({
        ...prev,
        guidancePriority: "لطفاً اولویت‌های هدایت تحصیلی را آپلود کنید",
      }));
      isValid = false;
    }

    if (!isValid) return;

    // ارسال داده‌ها به سرور
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      body: formDataToSend,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert("ثبت با موفقیت انجام شد!");
          // پاک کردن فرم
          setFormData({
            fullName: "",
            parentPhone: "",
            field: "",
            nationalCode: "",
            address: "",
            transcript: null,
            guidancePriority: null,
            award: "",
          });
          setTranscriptUploaded(false);
          setGuidanceUploaded(false);
        } else {
          alert("خطا در ثبت فرم: " + (data.error || "خطای نامشخص"));
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
      {/* پس‌زمینه شیشه‌ای */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 transition-colors duration-300">
        <div className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/70 rounded-2xl shadow-xl max-w-3xl mx-auto p-8 space-y-8">
          <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-8">
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
                className="font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaUser className="text-blue-500 dark:text-blue-400" /> نام و
                نام خانوادگی دانش‌آموز
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                minLength={3}
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none transition-all bg-white dark:bg-gray-700 dark:text-gray-200"
                placeholder="فقط حروف فارسی مجاز است"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* شماره تماس مادر/پدر */}
            <div className="flex flex-col">
              <label
                htmlFor="parentPhone"
                className="font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaPhone className="text-blue-500 dark:text-blue-400" /> شماره
                تماس همراه مادر/پدر
              </label>
              <input
                type="tel"
                id="parentPhone"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                required
                maxLength={11}
                pattern="[0-9]{11}"
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.parentPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parentPhone}
                </p>
              )}
            </div>

            {/* رشته آموزشی */}
            <div className="flex flex-col">
              <label
                htmlFor="field"
                className="font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaChalkboardTeacher className="text-blue-500 dark:text-blue-400" />{" "}
                رشته آموزشی مورد نظر
              </label>
              <select
                id="field"
                name="field"
                value={formData.field}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200">
                <option value="">انتخاب کنید</option>
                <option value="ساختمان">ساختمان</option>
                <option value="کامپیوتر">کامپیوتر</option>
              </select>
              {errors.field && (
                <p className="text-red-500 text-sm mt-1">{errors.field}</p>
              )}
            </div>

            {/* کد ملی */}
            <div className="flex flex-col">
              <label
                htmlFor="nationalCode"
                className="font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaIdCard className="text-blue-500 dark:text-blue-400" /> کد ملی
                دانش‌آموز
              </label>
              <input
                type="text"
                id="nationalCode"
                name="nationalCode"
                value={formData.nationalCode}
                onChange={handleChange}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.nationalCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nationalCode}
                </p>
              )}
            </div>

            {/* آدرس محل سکونت */}
            <div className="flex flex-col">
              <label
                htmlFor="address"
                className="font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaHome className="text-blue-500 dark:text-blue-400" /> آدرس
                دقیق محل سکونت
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={15}
                maxLength={2250}
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200"></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* کارنامه تحصیلی */}
            <div className="flex flex-col">
              <label
                htmlFor="transcript"
                className="font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaFileImage className="text-blue-500 dark:text-blue-400" />{" "}
                اطلاعات کارنامه تحصیلی (تصویر)
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
                  className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 bg-white dark:bg-gray-700 dark:text-gray-200">
                  انتخاب فایل (اجباری)
                </button>
              ) : (
                <div className="mt-3 border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-md shadow-sm text-sm">
                  عکس دریافت شد
                </div>
              )}
              {errors.transcript && (
                <p className="text-red-500 text-sm mt-1">{errors.transcript}</p>
              )}
            </div>

            {/* اولویت‌های هدایت تحصیلی */}
            <div className="flex flex-col">
              <label
                htmlFor="guidancePriority"
                className="font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaBullseye className="text-blue-500 dark:text-blue-400" />{" "}
                اولویت‌های هدایت تحصیلی (تصویر)
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
                  className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 bg-white dark:bg-gray-700 dark:text-gray-200">
                  انتخاب فایل (اجباری)
                </button>
              ) : (
                <div className="mt-3 border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-md shadow-sm text-sm">
                  عکس دریافت شد
                </div>
              )}
              {errors.guidancePriority && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.guidancePriority}
                </p>
              )}
            </div>

            {/* لوح تقدیر یا مقام علمی */}
            <div className="flex flex-col">
              <label
                htmlFor="award"
                className="font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaTrophy className="text-blue-500 dark:text-blue-400" /> لوح
                تقدیر یا مقام علمی (اختیاری)
              </label>
              <textarea
                id="award"
                name="award"
                value={formData.award}
                onChange={handleChange}
                rows={15}
                maxLength={2250}
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200"></textarea>
              {errors.award && (
                <p className="text-red-500 text-sm mt-1">{errors.award}</p>
              )}
            </div>

            {/* دکمه ثبت فرم */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-700 transition-all duration-300 shadow-md transform hover:-translate-y-1">
              ثبت فرم
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
