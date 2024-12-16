import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TopStudents() {
  const router = useRouter();
  const { testId } = router.query; // استخراج معرّف الاختبار من عنوان URL
  const [students, setStudents] = useState([]);
  const [testName, setTestName] = useState(""); // لتخزين اسم الاختبار
  const [maxScore, setMaxScore] = useState(0); // لتخزين الدرجة النهائية للاختبار
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
            setMaxScore(testData.questions.length || 0); // تخزين الدرجة النهائية
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300">
        <p className="text-xl font-bold text-gray-700">جارٍ تحميل بيانات الطلاب...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* شريط التنقل */}
      <nav className="bg-white shadow-md py-6 mb-8">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-extrabold text-blue-600">
            <Link href="/">المنصة التعليمية لمنهج الدراسات رابعة ابتدائي</Link>
          </h1>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <div className="container mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            أفضل 10 طلاب في اختبار: <span className="text-blue-600">{testName || "غير معروف"}</span>
          </h1>

          {students.length > 0 ? (
           <div className="overflow-x-auto">
           <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
             <thead>
               <tr className="bg-gray-200 text-black"> {/* تم تغيير لون النص إلى الأسود */}
                 <th className="p-4 text-sm md:text-base border border-gray-300">#</th>
                 <th className="p-4 text-sm md:text-base border border-gray-300">اسم الطالب</th>
                 <th className="p-4 text-sm md:text-base border border-gray-300">الدرجة</th>
                 <th className="p-4 text-sm md:text-base border border-gray-300">الدرجة النهائية</th>
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
                   <td className="p-4 text-center text-sm md:text-base border border-gray-300 text-black">
                     {/* تم تغيير لون النص إلى الأسود */}
                     {index + 1}
                   </td>
                   <td className="p-4 text-center text-sm md:text-base border border-gray-300 text-black">
                     {/* تم تغيير لون النص إلى الأسود */}
                     {student.studentId?.name || "غير معروف"}
                   </td>
                   <td className="p-4 text-center text-sm md:text-base border border-gray-300 text-black">
                     {/* تم تغيير لون النص إلى الأسود */}
                     {student.totalScore}
                   </td>
                   <td className="p-4 text-center text-sm md:text-base border border-gray-300 text-black">
                     {/* تم تغيير لون النص إلى الأسود */}
                     {maxScore}
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         
          ) : (
            <p className="text-center text-lg font-semibold text-gray-700">
              لا توجد بيانات لهذا الاختبار.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
