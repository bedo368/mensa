import { useState, useEffect } from "react";
import Link from "next/link";

export default function AvailableTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch available tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("/api/tests"); // Replace with your endpoint for fetching available tests
        if (response.ok) {
          const data = await response.json();
          setTests(data);
        } else {
          console.error("Failed to fetch available tests.");
        }
      } catch (error) {
        console.error("Error fetching available tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">جاري تحميل الاختبارات...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 py-8 px-4 ">
      {/* Navbar */}
      <nav className="bg-white text-white shadow-md py-6">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-extrabold text-blue-600">
            <Link href="/">المنصة التعليمية لمنهج الدراسات رابعة ابتدائي</Link>
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          الاختبارات المتاحة
        </h1>
        {tests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <div
                key={test._id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:scale-105 transition transform"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {test.title}
                </h2>
                <p className="text-gray-600">{test.description}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    عدد الأسئلة: {test.questions.length}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Link href={`/test/${test._id}`}>
                    <span className="text-blue-500 font-semibold cursor-pointer">
                      ابدأ الاختبار →
                    </span>
                  </Link>
                  <Link href={`/top-students/${test._id}`}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                      الطلاب المتفوقون
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-center">
            لا توجد اختبارات متاحة في الوقت الحالي.
          </p>
        )}
      </div>
    </div>
  );
}
