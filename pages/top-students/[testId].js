import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TopStudents() {
  const router = useRouter();
  const { testId } = router.query;
  const [students, setStudents] = useState([]);
  const [testName, setTestName] = useState("");
  const [maxScore, setMaxScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch top students and test info
  useEffect(() => {
    if (testId) {
      const fetchTopStudents = async () => {
        try {
          // 1) Fetch test data
          const testResponse = await fetch(`/api/tests/${testId}`);
          if (testResponse.ok) {
            const testData = await testResponse.json();
            setTestName(testData.title || "");
            setMaxScore(testData.questions.length || 0);
          } else {
            console.error("فشل في جلب بيانات الاختبار.");
          }

          // 2) Fetch students data
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-300 to-purple-500">
        <p className="text-xl font-bold text-white">جارٍ تحميل بيانات الطلاب...</p>
      </div>
    );
  }

  // -------------------------------------------------------------
  // OPTIONAL: A helper function to pick "row colors" like the image
  // -------------------------------------------------------------
  const getRowBgColor = (index) => {
    // You can vary colors for top 3 or just cycle:
    const colors = [
      "bg-yellow-100",  // 1st
      "bg-blue-100",    // 2nd
      "bg-red-100",     // 3rd
      "bg-gray-100",    // 4th+
    ];
    return colors[index] || colors[3];
  };

  // -------------------------------------------------------------
  // OPTIONAL: A helper to show star icons. In the screenshot, 
  // each student got up to 3 stars. You can adjust logic as needed.
  // -------------------------------------------------------------
  const getStarRating = (score, maxScore) => {
    // Example logic for up to 3 stars:
    const pct = (score / maxScore) * 100;
    if (pct >= 95) return "⭐⭐⭐"; 
    if (pct >= 90) return "⭐⭐";  
    if (pct > 0)   return "⭐";   
    return ""; 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-b from-purple-400 to-purple-600 p-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 relative">
        {/* Trophy icon up top (like the screenshot) */}
        <div className="flex items-center justify-center mb-3">
          <div className="bg-yellow-300 rounded-full p-3">
            {/* Emoji trophy or any icon of your choice */}
            <span className="text-2xl">🏆</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-1">
          {testName || "Space Quiz Champions!"}
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Our Amazing Star Students!
        </p>

        {/* Students List */}
        {students.length > 0 ? (
          <div className="flex flex-col gap-3">
            {students.map((student, index) => {
              const bgColor = getRowBgColor(index);
              const studentName = student.studentId?.name || "غير معروف";
              const scoreStars = getStarRating(student.totalScore, maxScore);

              return (
                <div
                  key={student._id}
                  className={`rounded-lg p-4 flex items-center justify-between ${bgColor}`}
                >
                  <div className="flex items-center gap-2">
                    {/* Example medal icon by rank (optional) */}
                    {index === 0 ? (
                      <span className="text-2xl">🥇</span>
                    ) : index === 1 ? (
                      <span className="text-2xl">🥈</span>
                    ) : index === 2 ? (
                      <span className="text-2xl">🥉</span>
                    ) : (
                      <span className="text-2xl">⭐</span>
                    )}
                    <p className="font-semibold text-gray-800">
                      {studentName}
                    </p>
                  </div>
                  {/* Score + Stars */}
                  <div className="text-right">
                    <p className="text-sm text-gray-700">
                      Score: {student.totalScore}/{maxScore}
                    </p>
                    {/* Star rating (optional) */}
                    <p className="text-yellow-500 font-semibold">
                      {scoreStars}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-lg font-semibold text-gray-700">
            لا توجد بيانات لهذا الاختبار.
          </p>
        )}

        {/* A bottom message like screenshot */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Keep learning and reaching for the stars!
        </p>
      </div>

      {/* Link back to home or tests, if desired */}
      <div className="mt-6">
        <Link href="/">
          <div className="cursor-pointer bg-white text-purple-600 px-4 py-2 
                          rounded-md shadow hover:bg-purple-50 font-semibold">
            العودة للصفحة الرئيسية
          </div>
        </Link>
      </div>
    </div>
  );
}
