import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";

export default function Panel() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Authentication Check
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  // Fetch Data from Server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/registrations",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("خطا در دریافت داده");
        }
        const data = await response.json();
        // Sort data by fullName to ensure consistent ordering
        const sortedData = data.sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );
        setRegistrations(sortedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("خطا در ارتباط با سرور!");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Calculate filtered and paginated data
  const { data: paginatedData, total: totalPages } = useMemo(() => {
    const filtered = registrations.filter((user) => {
      const matchesSearch = user.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesField = filterField === "all" || user.field === filterField;
      return matchesSearch && matchesField;
    });
    return {
      data: filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
      total: Math.ceil(filtered.length / itemsPerPage),
    };
  }, [registrations, searchTerm, filterField, currentPage, itemsPerPage]);

  const handleImageError = (e) => {
    e.target.src = "/images/default-image.png"; // placeholder image
  };

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6 font-vazir transition-colors duration-300">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              پنل مدیریت
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded transition w-full md:w-auto">
              خروج
            </button>
          </div>
          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="جستجوی نام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
            <select
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              <option value="all">همه</option>
              <option value="ساختمان">ساختمان</option>
              <option value="کامپیوتر">کامپیوتر</option>
            </select>
          </div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            لیست ثبت‌نام‌ها
          </h2>
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          ) : paginatedData.length === 0 ? (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              هیچ ثبت‌نامی یافت نشد.
            </p>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full table-auto border-collapse text-right table-layout-fixed">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      <th className="border dark:border-gray-600 px-4 py-2">
                        #
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        نام
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        شماره تماس
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        رشته
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        کد ملی
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        آدرس
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        کارنامه
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        اولویت هدایت
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2">
                        لوح تقدیر
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                    {paginatedData.map((user, index) => (
                      <tr
                        key={user._id || user.id || index} // Use index as fallback
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                        <td className="border dark:border-gray-600 px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200">
                          {user.fullName}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200">
                          {user.parentPhone}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-blue-400">
                          {user.field}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200">
                          {user.nationalCode}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200">
                          {user.address}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2">
                          {user.transcript &&
                          typeof user.transcript === "string" ? (
                            <a
                              href={user.transcript}
                              target="_blank"
                              rel="noopener noreferrer">
                              <img
                                src={user.transcript}
                                alt="کارنامه"
                                onError={handleImageError}
                                className="w-24 h-24 object-cover rounded border dark:border-gray-600"
                              />
                            </a>
                          ) : (
                            <span className="dark:text-gray-400">ندارد</span>
                          )}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2">
                          {user.guidancePriority &&
                          typeof user.guidancePriority === "string" ? (
                            <a
                              href={user.guidancePriority}
                              target="_blank"
                              rel="noopener noreferrer">
                              <img
                                src={user.guidancePriority}
                                alt="اولویت هدایت"
                                onError={handleImageError}
                                className="w-24 h-24 object-cover rounded border dark:border-gray-600"
                              />
                            </a>
                          ) : (
                            <span className="dark:text-gray-400">ندارد</span>
                          )}
                        </td>
                        <td className="border dark:border-gray-600 px-4 py-2 dark:text-gray-200">
                          {user.award || (
                            <span className="dark:text-gray-400">ندارد</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile Cards */}
              <div className="block md:hidden space-y-4">
                {paginatedData.map((user, index) => (
                  <div
                    key={user._id || user.id || index} // Use index as fallback
                    className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-4 shadow-sm transition-transform duration-150 hover:scale-[1.01]">
                    <div className="space-y-2">
                      <p>
                        <strong>نام:</strong> {user.fullName}
                      </p>
                      <p>
                        <strong>شماره تماس:</strong> {user.parentPhone}
                      </p>
                      <p>
                        <strong>رشته:</strong> {user.field}
                      </p>
                      <p>
                        <strong>کد ملی:</strong> {user.nationalCode}
                      </p>
                      <p>
                        <strong>آدرس:</strong> {user.address}
                      </p>
                      <p>
                        <strong>کارنامه:</strong>
                      </p>
                      {user.transcript &&
                      typeof user.transcript === "string" ? (
                        <a
                          href={user.transcript}
                          target="_blank"
                          rel="noopener noreferrer">
                          <img
                            src={user.transcript}
                            alt="کارنامه"
                            onError={handleImageError}
                            className="w-full max-w-xs h-auto object-cover rounded border dark:border-gray-600"
                          />
                        </a>
                      ) : (
                        <span className="dark:text-gray-400">ندارد</span>
                      )}
                      <p>
                        <strong>اولویت هدایت:</strong>
                      </p>
                      {user.guidancePriority &&
                      typeof user.guidancePriority === "string" ? (
                        <a
                          href={user.guidancePriority}
                          target="_blank"
                          rel="noopener noreferrer">
                          <img
                            src={user.guidancePriority}
                            alt="اولویت هدایت"
                            onError={handleImageError}
                            className="w-full max-w-xs h-auto object-cover rounded border dark:border-gray-600"
                          />
                        </a>
                      ) : (
                        <span className="dark:text-gray-400">ندارد</span>
                      )}
                      <p>
                        <strong>لوح تقدیر:</strong>{" "}
                        {user.award || (
                          <span className="dark:text-gray-400">ندارد</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    disabled={currentPage === i + 1}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
