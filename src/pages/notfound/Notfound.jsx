/** @format */
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-colors duration-300">
      <h1 className="text-3xl md:text-5xl font-extrabold text-white dark:text-blue-200 mb-8 text-center drop-shadow-lg">
        همچین صفحه‌ای وجود نداره
      </h1>
      <Link to="/" className="">
        <button
          className="px-8 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-lg font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-100 dark:focus:ring-blue-700"
        >
          بازگشت به صفحه اصلی
        </button>
      </Link>
    </div>
  );
}
export default Notfound;
