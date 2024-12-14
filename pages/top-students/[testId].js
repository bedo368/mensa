import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // لتسهيل التنقل بين الصفحات

export default function TopStudents() {
  const router = useRouter();
  const { testId } = router.query; // استخراج معرّف الاختبار من عنوان URL
  const [students, setStudents] = useState([]);
  const [testName, setTestName] = useState(""); // لتخزين اسم الاختبار
  const [loading, setLoading] = useState(true);

  // جلب الطلاب واسم الاختبار
  useEffect(() => {
    if (testId) {
      const fetchTopStudents = async () => {
        try {
          // جلب بيانات الاختبار
          const testResponse = await fetch(`/api/tests/${testId}`);
          if (testResponse.ok) {
            const testData = await testResponse.json();
            setTestName(testData.title); // تخزين اسم الاختبار
          } else {
            console.error("فشل في جلب بيانات الاختبار.");
          }

          // جلب بيانات الطلاب
          const studentsResponse = await fetch(`/api/top-students/${testId}`);
          if (studentsResponse.ok) {
            const studentsData = await studentsResponse.json();
            setStudents(studentsData);
          } else {
            console.error("فشل في جلب بيانات الطلاب.");
          }
        } catch (error) {
          console.error("خطأ أثناء جلب البيانات:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTopStudents();
    }
  }, [testId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">جاري تحميل بيانات الطلاب...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* شريط التنقل */}
      <nav className="bg-blue-600 text-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-xl font-bold">منصة تعليم الصف الرابع الابتدائي</h1>
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-gray-200">
              الصفحة الرئيسية
            </Link>
            <Link href="/student/dashboard" className="hover:text-gray-200">
              لوحة التحكم
            </Link>
          </div>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-black mb-8 text-center">
            أفضل 10 طلاب في اختبار: {testName || "غير معروف"}
          </h1>
          {students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-300 text-black">
                    <th className="text-center p-4 border-b border-gray-200 w-1/4">
                      الترتيب
                    </th>
                    <th className="text-center p-4 border-b border-gray-200 w-1/2">
                      اسم الطالب
                    </th>
                    <th className="text-center p-4 border-b border-gray-200 w-1/4">
                      الدرجة الكلية
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200`}
                    >
                      <td className="text-center p-4 border-b border-gray-300 text-black">
                        {index + 1}
                      </td>
                      <td className="text-center p-4 border-b border-gray-300 text-black">
                        {student.studentId?.name || "غير معروف"}
                      </td>
                      <td className="text-center p-4 border-b border-gray-300 text-black">
                        {student.totalScore}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-black text-center text-lg">
              لا توجد بيانات لهذا الاختبار.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
