import { useState, useEffect } from "react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // حالة التسجيل

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("كلمة المرور غير متطابقة.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // تخزين التوكن في localStorage
        localStorage.setItem("token", data.token);

        setMessage("تم التسجيل بنجاح!");
        setIsRegistered(true); // تغيير الحالة إلى "تم التسجيل"
      } else {
        setMessage(data.error || "حدث خطأ ما، حاول مجددًا.");
      }
    } catch (error) {
      setMessage("خطأ في الاتصال بالخادم.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // التأكد من تخزين التوكن بعد التسجيل
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token stored successfully:", token);
    }
  }, [isRegistered]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 py-8 px-4">
      {/* Header */}
      <header className="bg-white text-white py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" >
          <h1 className="text-xl font-bold" style={{color: "#3b82f6"}} >المنصة التعليمية لمنهج الدراسات رابعة ابتدائي</h1>
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            تسجيل الدخول
          </Link>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex-grow flex items-center justify-center">
        {isRegistered ? (
          // رسالة النجاح
          <div className="text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-500 text-white rounded-full p-8 shadow-lg mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">تم التسجيل بنجاح!</h2>
              <p className="text-gray-600 mb-6">
                شكراً لتسجيلك في منصتنا. يمكنك الآن العودة إلى الصفحة الرئيسية.
              </p>
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                العودة إلى الصفحة الرئيسية
              </Link>
            </div>
          </div>
        ) : (
          // نموذج التسجيل
          <div className="bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              تسجيل حساب جديد
            </h2>
            {message && <p className="text-center mb-4 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800">الاسم</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 text-black text-lg border rounded-lg shadow-sm placeholder-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 text-black text-lg border rounded-lg shadow-sm placeholder-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">العمر</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 text-black text-lg border rounded-lg shadow-sm placeholder-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل عمرك"
                  min="5"
                  max="100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">كلمة المرور</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 text-black text-lg border rounded-lg shadow-sm placeholder-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="********"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 text-black text-lg border rounded-lg shadow-sm placeholder-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="********"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                تسجيل
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 المنصة التعليمية لمنهج الدراسات رابعة ابتدائي. جميع الحقوق محفوظة.</p>
          <p className="text-sm mt-2">
            <Link href="/about" className="underline hover:text-gray-300">
              حول المنصة
            </Link>{" "}
            |{" "}
            <Link href="/contact" className="underline hover:text-gray-300">
              تواصل معنا
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
