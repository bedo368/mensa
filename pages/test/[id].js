import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import jwtDecode from "jsonwebtoken";

export default function StudentTest() {
  const router = useRouter();
  const { id } = router.query; // الحصول على معرف الاختبار من الـ URL
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true); // حالة تحميل الصورة
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [studentId, setStudentId] = useState(null);

  // استخراج معرف الطالب من التوكن
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode.decode(token);
        setStudentId(decodedToken.id);
      } catch (error) {
        alert("توكن غير صالح. الرجاء تسجيل الدخول مرة أخرى.");
        router.push("/login"); // التوجيه لصفحة تسجيل الدخول
      }
    } else {
      alert("الرجاء تسجيل الدخول.");
      router.push("/login"); // التوجيه لصفحة تسجيل الدخول
    }
  }, [router]);

  // جلب بيانات الاختبار
  useEffect(() => {
    if (id) {
      const fetchTest = async () => {
        try {
          const response = await fetch(`/api/tests/${id}`);
          if (response.ok) {
            const data = await response.json();
            setTest(data);
            setLoading(false);
          } else {
            alert("فشل في جلب بيانات الاختبار");
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          alert("حدث خطأ أثناء تحميل الاختبار.");
        }
      };
      fetchTest();
    }
  }, [id]);

  // حساب نسبة التقدم
  const calculateProgress = () => {
    const totalQuestions = test?.questions.length || 0;
    const answeredQuestions = Object.keys(answers).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  // اختيار الإجابة
  const handleAnswerChange = (selectedOption) => {
    setAnswers({ ...answers, [currentQuestion]: selectedOption });
  };

  // الانتقال للسؤال التالي
  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setImageLoading(true); // إعادة تعيين حالة تحميل الصورة للسؤال التالي
    }
  };

  // الانتقال للسؤال السابق
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setImageLoading(true); // إعادة تعيين حالة تحميل الصورة للسؤال السابق
    }
  };

  // إرسال الاختبار
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/submit-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testId: id,
          studentId,
          answers,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult({
          totalScore: data.totalScore,
          maxScore: data.maxScore,
          message: data.message || "تم إرسال الاختبار بنجاح!",
        });
      } else {
        alert("فشل في إرسال الاختبار.");
      }
    } catch (error) {
      alert("حدث خطأ. حاول مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-200 to-purple-400">
        <p className="text-xl font-bold text-white">جارٍ تحميل الاختبار...</p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-200 to-purple-400">
        <p className="text-xl font-bold text-white">الاختبار غير موجود.</p>
      </div>
    );
  }

  const question = test.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        {/* شريط التقدم */}
        <div className="w-full bg-gray-300 rounded-full mb-6">
          <div
            className="bg-green-500 text-xs font-medium text-white text-center p-1 leading-none rounded-full transition-all"
            style={{ width: `${calculateProgress()}%` }}
          >
            {calculateProgress()}%
          </div>
        </div>

        {/* إذا كانت النتيجة موجودة، يتم عرض النتيجة */}
        {result ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-500 mb-4">نتيجة الاختبار</h2>
            <p className="text-2xl font-semibold text-gray-800">
              درجتك: {result.totalScore} / {result.maxScore}
            </p>
            <p className="text-lg text-gray-600 mt-2">{result.message}</p>
            <div className="flex justify-center gap-4 mt-6">
              <Link href={`/top-students/${id}`}>
                <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  صفحة المتفوقين
                </div>
              </Link>
              <Link href="/student/tests">
                <div className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
                  صفحة الاختبارات
                </div>
              </Link>
              <Link href="/">
                <div className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  العودة إلى الصفحة الرئيسية
                </div>
              </Link>
            </div>

          </div>
        ) : (
          <>
            {/* عنوان الاختبار */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{test.title}</h1>

            {/* مربع السؤال */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {currentQuestion + 1}. {question.question}
              </h2>

              {/* صورة السؤال */}
              {question.image && (
                <div className="flex justify-center items-center mb-6">
                  {imageLoading && (
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  )}
                  <img
                    src={question.image}
                    alt="Question Image"
                    className={`w-1/2 max-h-60 rounded-lg shadow ${imageLoading ? "hidden" : "block"
                      }`}
                    onLoad={() => setImageLoading(false)}
                  />
                </div>
              )}

              {/* الخيارات */}
              <div className="grid grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerChange(index)}
                    className={`py-3 px-4 text-lg font-semibold rounded-lg shadow transition duration-300 ${answers[currentQuestion] === index
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* أزرار التنقل */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className={`px-6 py-2 rounded-lg font-bold shadow ${currentQuestion === 0
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                disabled={currentQuestion === 0}
              >
                السابق
              </button>
              {currentQuestion === test.questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className={`px-6 py-2 rounded-lg font-bold shadow ${submitting
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  disabled={submitting}
                >
                  {submitting ? "جارٍ الإرسال..." : "إرسال الاختبار"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className={`px-6 py-2 rounded-lg font-bold shadow ${answers[currentQuestion] === undefined
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  disabled={answers[currentQuestion] === undefined}
                >
                  التالي
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
