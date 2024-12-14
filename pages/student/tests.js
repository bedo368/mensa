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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <Link href="/">
          <h1 className="text-xl font-bold">منصة تعليم الصف الرابع الابتدائي</h1>
          </Link>
          <div className="flex space-x-4">
           
            <Link href="/student/tests/past" className="hover:text-gray-200">
              الاختبارات السابقه 
            </Link>
          </div>
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
              <Link key={test._id} href={`/test/${test._id}`}>
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:scale-105 transition transform cursor-pointer">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{test.title}</h2>
                  <p className="text-gray-600">{test.description}</p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      عدد الأسئلة: {test.questions.length}
                    </p>
                  </div>
                  <div className="mt-4 text-right">
                    <span className="text-blue-500 font-semibold">ابدأ الاختبار →</span>
                  </div>
                </div>
              </Link>
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
