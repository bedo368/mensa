import { useState, useEffect } from "react";
import jwtDecode from "jsonwebtoken"; // استيراد مكتبة jwt-decode
import "../app/globals.css";

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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

  return (
    <div className="flex">
      {/* الشريط الجانبي - يظهر فقط للمستخدم المسجل */}
      {isLoggedIn && (
        <aside className="hidden lg:block w-64 bg-gray-800 text-white h-screen p-6">
          <h2 className="text-2xl font-bold mb-8">القائمة</h2>
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
          </nav>
        </aside>
      )}

      {/* المحتوى الرئيسي */}
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
