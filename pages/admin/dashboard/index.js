import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // لإعادة التوجيه

export default function Dashboard() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // إعداد التوجيه

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("/api/tests"); // افترض وجود API لجلب الاختبارات
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  // وظيفة لحذف الاختبار
  const deleteTest = async (id) => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا الاختبار؟")) {
      try {
        const response = await fetch(`/api/test/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (response.ok) {
          // تحديث الحالة بعد الحذف
          setTests((prevTests) => prevTests.filter((test) => test._id !== id));
          alert("تم حذف الاختبار بنجاح");
        } else {
          alert("حدث خطأ أثناء حذف الاختبار: " + data.message);
        }
      } catch (error) {
        console.error("Error deleting test:", error);
        alert("حدث خطأ أثناء حذف الاختبار");
      }
    }
  };

  // وظيفة فتح صفحة "Top Students" للامتحان
  const navigateToTopStudents = (testId) => {
    router.push(`/top-students/${testId}`); // التوجيه إلى صفحة Top Students
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-xl font-bold">منصة تعليم الصف الرابع الابتدائي</h1>
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-gray-200">
              الصفحة الرئيسية
            </Link>
            <div className="mx-5">

            <Link href="/admin/dashboard" className="hover:text-gray-200">
            </Link>
            </div>
              لوحة التحكم
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">جميع الاختبارات</h2>
          <p className="text-gray-700">
            هنا يمكنك عرض جميع الاختبارات المضافة وإدارتها بسهولة.
          </p>
        </div>

        <div className="flex justify-end mb-4">
          <Link
            href="/admin/new-test"
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            إضافة اختبار جديد
          </Link>
        </div>

        {/* Test List */}
        {loading ? (
          <p className="text-gray-500 text-center">جارٍ تحميل البيانات...</p>
        ) : tests.length === 0 ? (
          <p className="text-gray-500 text-center">لا توجد اختبارات مضافة حتى الآن.</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="w-full table-auto text-black border-separate border-spacing-2">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="py-2 px-4 text-center border">ID</th>
                  <th className="py-2 px-4 text-center border">عنوان الاختبار</th>
                  <th className="py-2 px-4 text-center border">عدد الأسئلة</th>
                  <th className="py-2 px-4 text-center border">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr
                    key={test._id}
                    className="text-center border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigateToTopStudents(test._id)} // التوجيه عند النقر على الصف
                  >
                    <td className="py-2 border">{test._id}</td>
                    <td className="py-2 border">{test.title}</td>
                    <td className="py-2 border">{test.questions.length}</td>
                    <td className="py-2 border">
                      <button
                        className="text-red-500 underline hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation(); // منع فتح صفحة Top Students عند النقر على زر الحذف
                          deleteTest(test._id);
                        }}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
