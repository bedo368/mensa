import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("تم تسجيل الدخول بنجاح!");
        localStorage.setItem("token", data.token); // تخزين التوكن في localStorage
        window.location.href = "/"; // إعادة التوجيه إلى الصفحة الرئيسية
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 py-8 px-4">
      {/* Header */}
      <header className="bg-white text-white py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href='/' >
            <h1 className="text-xl font-bold" style={{color: "#1d4ed8"}}>المنصة التعليمية لمنهج الدراسات رابعة ابتدائي</h1>
          </Link>
         
          <Link
            href="/register"
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            التسجيل
          </Link>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">تسجيل الدخول</h2>
          {message && <p className="text-center mb-4 text-red-500">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
}
