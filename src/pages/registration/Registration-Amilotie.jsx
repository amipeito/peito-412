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
  FaSchool,
} from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    parentPhone: "",
    field: "",
    nationalCode: "",
    address: "",
    previousSchool: "",
    transcript: null,
    guidancePriority: null,
    award: "",
    landline: "",
  });
  const [transcriptUploaded, setTranscriptUploaded] = useState(false);
  const [guidanceUploaded, setGuidanceUploaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/jpg',
  ];

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
      if (file && !allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "فقط فایل عکس با فرمت jpg, jpeg, png, gif, webp مجاز است.",
        }));
        setFormData((prev) => ({ ...prev, [name]: null }));
        if (name === "transcript") setTranscriptUploaded(false);
        else if (name === "guidancePriority") setGuidanceUploaded(false);
        return;
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
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
      } else if (name === "landline") {
        newValue = value.replace(/[^0-9]/g, "").slice(0, 11); // فقط عدد و حداکثر 11 رقم
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

    if (!formData.previousSchool) {
      setErrors((prev) => ({
        ...prev,
        previousSchool: "نام مدرسه قبلی اجباری است",
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
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          setServerError(data.error || "خطایی رخ داده است");
          return;
        }
        if (data.success) {
          alert("ثبت با موفقیت انجام شد!");
          // پاک کردن فرم
          setFormData({
            fullName: "",
            parentPhone: "",
            field: "",
            nationalCode: "",
            address: "",
            previousSchool: "",
            transcript: null,
            guidancePriority: null,
            award: "",
            landline: "",
          });
          setTranscriptUploaded(false);
          setGuidanceUploaded(false);
          setServerError("");
        } else {
          alert("خطا در ثبت فرم: " + (data.error || "خطای نامشخص"));
        }
      })
      .catch(() => {
        setServerError("خطا در ارتباط با سرور");
      });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-8 p-4 bg-white dark:bg-gray-800 rounded shadow">
        <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded text-center text-sm">
          توجه: شما فقط هر ۳ دقیقه یک بار می‌توانید اطلاعات ثبت‌نام ارسال کنید. اگر قبلاً ثبت‌نام شما کامل بوده، نیازی به ارسال مجدد نیست.
        </div>
        {serverError && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded text-center text-sm">
            {serverError}
          </div>
        )}
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

            {/* نام مدرسه قبلی */}
            <div className="flex flex-col">
              <label
                htmlFor="previousSchool"
                className="font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaSchool className="text-blue-500 dark:text-blue-400" /> نام مدرسه قبلی
              </label>
              <input
                type="text"
                id="previousSchool"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none transition-all bg-white dark:bg-gray-700 dark:text-gray-200"
                placeholder="نام مدرسه قبلی"
              />
              {errors.previousSchool && (
                <p className="text-red-500 text-sm mt-1">{errors.previousSchool}</p>
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
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">فقط عکس با فرمت jpg, jpeg, png, gif, webp و حداکثر حجم ۵۰ مگابایت مجاز است.</span>
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
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">فقط عکس با فرمت jpg, jpeg, png, gif, webp و حداکثر حجم ۵۰ مگابایت مجاز است.</span>
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

            {/* تلفن ثابت */}
            <div className="flex flex-col">
              <label
                htmlFor="landline"
                className="font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaPhone className="text-blue-500 dark:text-blue-400" /> تلفن ثابت
              </label>
              <input
                type="tel"
                id="landline"
                name="landline"
                value={formData.landline}
                onChange={handleChange}
                maxLength={11}
                pattern="[0-9]{0,11}"
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none transition-all bg-white dark:bg-gray-700 dark:text-gray-200"
                placeholder="مثلاً 01112345678"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">تا ۱۱ رقم (اختیاری)</span>
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
