import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // لإعادة التوجيه
import jwtDecode from "jsonwebtoken"; // فك التوكن

export default function Dashboard() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // للتحقق من الصلاحيات
  const router = useRouter();

  // التحقق من التوكن والصلاحيات
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode.decode(token);

        if (decodedToken?.type === "admin") {
          setIsAdmin(true);
        } else {
          // إعادة التوجيه إذا لم يكن المستخدم أدمن
          router.push("/");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/"); // إعادة التوجيه في حالة الخطأ
      }
    } else {
      router.push("/"); // إعادة التوجيه إذا لم يوجد توكن
    }
  }, [router]);

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    if (isAdmin) {
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
    }
  }, [isAdmin]);

  // وظيفة لحذف الاختبار
  const deleteTest = async (id) => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا الاختبار؟")) {
      try {
        const response = await fetch(`/api/test/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (response.ok) {
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

  // وظيفة فتح صفحة "Top Students"
  const navigateToTopStudents = (testId) => {
    router.push(`/top-students/${testId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-8 px-4">
      {/* Navbar */}
      <nav className="bg-white text-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-extrabold text-blue-600">
            <Link href="/">المنصة التعليمية لمنهج الدراسات رابعة ابتدائي</Link>
          </h1>          
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
                    onClick={() => navigateToTopStudents(test._id)}
                  >
                    <td className="py-2 border">{test._id}</td>
                    <td className="py-2 border">{test.title}</td>
                    <td className="py-2 border">{test.questions.length}</td>
                    <td className="py-2 border">
                      <button
                        className="text-red-500 underline hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
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
