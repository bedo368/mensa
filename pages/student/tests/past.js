import { useState, useEffect } from "react";
import Link from "next/link";
import jwtDecode from "jsonwebtoken"; // Import the jwt-decode library

export default function StudentTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // استرداد بيانات الطالب من الـ token
  useEffect(() => {
    const fetchTests = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (!token) {
        alert("الرجاء تسجيل الدخول لرؤية الاختبارات الخاصة بك.");
        return;
      }

      try {
        // Decode the token to extract the studentId
        const decodedToken = jwtDecode.decode(token);
        console.log(decodedToken);
        const studentId = decodedToken.id; // Replace `id` with the exact key in your token

        if (!studentId) {
          alert("لا يمكن العثور على معرّف الطالب.");
          return;
        }

        // Fetch completed tests for the student
        const response = await fetch(`/api/student-tests/${studentId}`);
        if (response.ok) {
          const data = await response.json();
          setTests(data);
        } else {
          console.error("فشل في جلب الاختبارات المكتملة.");
        }
      } catch (error) {
        console.error("خطأ أثناء جلب الاختبارات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">جاري تحميل بيانات الاختبارات...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* شريط التنقل */}
      <nav className="bg-blue-600 text-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <Link>
          <h1 className="text-xl font-bold">منصة تعليم الصف الرابع الابتدائي</h1>
          </Link>
          <div className="flex space-x-4">
            <Link href="/student/tests/past" className="hover:text-gray-200">
            الاختبات المتاحه 
            </Link>

          </div>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-black mb-8 text-center">
            اختباراتك المكتملة
          </h1>
          {tests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-300 text-black">
                    <th className="text-center p-4 border-b border-gray-200 w-1/2">
                      عنوان الاختبار
                    </th>
                    <th className="text-center p-4 border-b border-gray-200 w-1/4">
                      الدرجة
                    </th>
                    <th className="text-center p-4 border-b border-gray-200 w-1/4">
                      التاريخ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test) => (
                    <tr
                      key={test._id}
                      className="hover:bg-gray-200 bg-white border-b border-gray-300"
                    >
                      <td className="text-center p-4 text-black">
                        {test.testId?.title || "غير معروف"}
                      </td>
                      <td className="text-center p-4 text-black">
                        {test.totalScore}
                      </td>
                      <td className="text-center p-4 text-black">
                        {new Date(test.createdAt).toLocaleDateString("ar-EG")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-black text-center text-lg">
              لا توجد اختبارات مكتملة حتى الآن.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
