import { useState, useEffect } from "react";
import jwtDecode from "jsonwebtoken"; // استيراد مكتبة jwt-decode
import "../app/globals.css";

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // للتحكم في حالة المينو

  // التحقق من التوكن في localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);

      try {
        const decodedToken = jwtDecode.decode(token); // فك تشفير التوكن
        if (decodedToken.type === "admin") {
          setIsAdmin(true); // المستخدم أدمن
        }
      } catch (error) {
        console.error("خطأ في فك تشفير التوكن:", error);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token"); // إزالة التوكن من localStorage
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsSidebarOpen(false); // إغلاق القائمة
    window.location.reload();
  };

  return (
    <div className="h-screen flex">
      {/* الشريط الجانبي - دائم الظهور بجانب المحتوى في الشاشات الكبيرة */}
      {isLoggedIn && (
        <aside
        style={{ backgroundColor: "#5049e3" }}

          className={`${
            isSidebarOpen ? "fixed left-0 top-0 z-40" : "hidden"
          } lg:relative lg:flex lg:left-0 lg:z-auto lg:w-64 b text-white h-screen lg:h-auto lg:min-h-screen p-6 transition-all duration-300`}
        >
          <nav className="flex flex-col gap-4">
            <a href="/" className="hover:bg-gray-700 p-2 rounded-lg transition">
              الصفحة الرئيسية
            </a>
            {/* إظهار لوحة التحكم فقط إذا كان المستخدم أدمن */}
            {isAdmin && (
              <a
                href="/admin/dashboard"
                className="hover:bg-gray-700 p-2 rounded-lg transition"
              >
                لوحة التحكم
              </a>
            )}
            <a
              href="/student/tests"
              className="hover:bg-gray-700 p-2 rounded-lg transition"
            >
              الاختبارات
            </a>
            <a
              href="/student/tests/past"
              className="hover:bg-gray-700 p-2 rounded-lg transition"
            >
              الاختبارات السابقة
            </a>
            {/* زر تسجيل الخروج */}
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
            >
              تسجيل الخروج
            </button>
          </nav>
        </aside>
      )}

      {/* المحتوى الرئيسي */}
      <main className="flex-1 overflow-auto">
        {/* الزر الخاص بفتح القائمة الجانبية على الشاشات الصغيرة */}
        {isLoggedIn && (
          <button
            className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md flex items-center justify-center"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        )}

        <Component {...pageProps} />
      </main>

      {/* Overlay لإغلاق القائمة عند النقر خارجها */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
