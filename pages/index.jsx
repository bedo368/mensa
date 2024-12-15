import { useEffect, useState } from "react";
import Link from "next/link";
import jwtDecode from "jsonwebtoken";

export default function Home() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(user)
  // قراءة JWT من localStorage عند تحميل الصفحة
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode.decode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <h1 className="text-2xl font-extrabold text-blue-600">
            <Link href="/">منصة تعليم الصف الرابع الابتدائي</Link>
          </h1>

          {/* Large Screen Menu */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                  التسجيل
                </Link>
              </>
            ) : (
              <>
                {user.type === "Student" && (
                  <>
                    <Link
                      href="/student/tests/past"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                      الاختبارات السابقة
                    </Link>
                    <Link
                      href="/student/tests"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                      الاختبارات الحالية
                    </Link>
                  </>
                )}
                {user.type === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                  >
                    لوحة التحكم
                  </Link>
                )}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    <span>{user.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        تسجيل الخروج
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 hover:text-gray-600"
            >
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white shadow-md">
            {!user ? (
              <div className="flex flex-col space-y-2 p-4">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                  التسجيل
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 p-4">
                {user.type === "Student" && (
                  <>
                    <Link
                      href="/student/tests/past"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                      الاختبارات السابقة
                    </Link>
                    <Link
                      href="/student/tests/available"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                      الاختبارات الحالية
                    </Link>
                  </>
                )}
                {user.type === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                  >
                    لوحة التحكم
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        )}

      </nav>

      {/* Main Section */}
      <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center justify-between py-16 px-6">
        {/* Left Section - Image */}
        <div className="lg:w-1/2">
          <img
            src="/images/kids-learning.png"
            alt="Kids Learning"
            className="rounded-lg shadow-lg transform hover:scale-105 transition"
          />
        </div>

        {/* Right Section - Description */}
        <div className="lg:w-1/2 lg:pr-12 mt-8 lg:mt-0 text-right">
          <h2 className="text-5xl font-extrabold text-blue-800 mb-4">
            أهلاً وسهلاً بكم في منصتنا!
          </h2>
          <p className="text-lg text-gray-800 mb-6 leading-relaxed">
            منصة تعليم الصف الرابع الابتدائي صممت لجعل التعلم ممتعًا وسهلًا للأطفال. نقدم مجموعة
            متنوعة من الأسئلة التفاعلية والألعاب التعليمية التي تساعد على تطوير
            المهارات وتنمية المعرفة في بيئة مشوقة وآمنة.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-12">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          مميزات منصتنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-yellow-100 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
            <img
              src="/images/kid-question.png"
              alt="Interactive Questions"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-yellow-800 mb-2">
              أسئلة ممتعة
            </h3>
            <p className="text-gray-700">
              أسئلة تعليمية تفاعلية تناسب مختلف الأعمار والاهتمامات.
            </p>
          </div>
          <div className="p-6 bg-pink-100 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
            <img
              src="/images/kid-result.png"
              alt="Instant Results"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-pink-800 mb-2">
              نتائج فورية
            </h3>
            <p className="text-gray-700">
              احصل على نتائج فورية تساعدك على تحسين مستواك.
            </p>
          </div>
          <div className="p-6 bg-green-100 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
            <img
              src="/images/good-exper.png"
              alt="Fun Learning"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-800 mb-2">
              تجربة مبهجة
            </h3>
            <p className="text-gray-700">
              واجهة سهلة ومشوقة للأطفال لتعلم ممتع ومفيد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
