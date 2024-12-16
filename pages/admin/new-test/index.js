import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NewTest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // For redirection

  // Add a new question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0, image: null },
    ]);
  };

  // Handle changes to question text or other fields
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle changes to options for a specific question
  const handleOptionChange = (qIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Handle image file upload
  const handleImageUpload = (qIndex, file) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].image = file; // Store the raw File object
    setQuestions(updatedQuestions);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || questions.length === 0) {
      alert("الرجاء إدخال عنوان الاختبار والوصف وإضافة سؤال واحد على الأقل.");
      return;
    }

    setLoading(true); // Set loading to true while submitting

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      // Serialize questions and append files
      const serializedQuestions = questions.map((q, index) => {
        const questionData = { ...q }; // Clone question data
        if (q.image && q.image instanceof File) {
          formData.append(`image_${index}`, q.image); // Append the raw file
          questionData.image = `image_${index}`; // Reference the file key
        }
        return questionData;
      });

      formData.append("questions", JSON.stringify(serializedQuestions));

      const response = await fetch("/api/new-test", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("تم إنشاء الاختبار بنجاح!");
        setTitle("");
        setDescription("");
        setQuestions([]);
        router.push("/admin/dashboard"); // Redirect to dashboard
      } else {
        const errorData = await response.json();
        alert(`خطأ: ${errorData.error}`);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء إنشاء الاختبار:", error);
      alert("حدث خطأ. الرجاء المحاولة مرة أخرى.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Navbar */}
      <nav className="bg-white text-white shadow-md py-6">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-extrabold text-blue-600">
            <Link href="/">المنصة التعليمية لمنهج الدراسات رابعة ابتدائي</Link>
          </h1>
        </div>
      </nav>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-8 px-4" dir="rtl">

        <style jsx>{`
        input, textarea {
          color: #333;
          font-size: 16px;
        }
        input::placeholder, textarea::placeholder {
          color: #6b7280;
        }
        input:focus, textarea:focus {
          color: #000;
        }
      `}</style>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">إنشاء اختبار جديد</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">عنوان الاختبار</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="أدخل عنوان الاختبار"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">وصف الاختبار</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="أدخل وصفًا للاختبار"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">الأسئلة</h2>
              {questions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="mb-6 border p-4 rounded-lg shadow-sm bg-gray-50 space-y-4"
                >
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      السؤال {qIndex + 1}
                    </label>
                    <textarea
                      value={question.question}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "question", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="أدخل نص السؤال"
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">الخيارات</h3>
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="mb-2 flex items-center space-x-2">
                        <span className="text-gray-600">{oIndex + 1}.</span>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e.target.value)
                          }
                          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                          placeholder={`الخيار ${oIndex + 1}`}
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      الإجابة الصحيحة
                    </label>
                    <select
                      value={question.correctAnswer}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "correctAnswer", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                      required
                    >
                      {question.options.map((_, oIndex) => (
                        <option key={oIndex} value={oIndex}>
                          الخيار {oIndex + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      صورة للسؤال (اختياري)
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleImageUpload(qIndex, e.target.files[0])}
                      className="block w-full text-gray-600"
                    />
                    {question.image && question.image instanceof File && (
                      <span className="text-sm text-gray-500">
                        {question.image.name} تم اختيار الملف
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                إضافة سؤال
              </button>
            </div>

            <button
              type="submit"
              className={`px-6 py-3 rounded-lg shadow w-full transition ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              disabled={loading}
            >
              {loading ? "جارٍ الإنشاء..." : "إنشاء الاختبار"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
