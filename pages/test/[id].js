import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import jwtDecode from "jsonwebtoken"; // Import the jwt-decode library

export default function StudentTest() {
  const router = useRouter();
  const { id } = router.query; // Get the test ID from the URL
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0); // To track the current question
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // Store the test result after submission
  const [studentId, setStudentId] = useState(null); // Store the extracted student ID

  // Fetch the student ID from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assume the JWT is stored under 'token'
    if (token) {
      try {
        const decodedToken = jwtDecode.decode(token); // Decode the token
        setStudentId(decodedToken.id); // Extract the student ID
        console.log(decodedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        alert("Invalid token. Please log in again.");
        router.push("/login"); // Redirect to login if the token is invalid
      }
    } else {
      alert("You are not logged in.");
      router.push("/login"); // Redirect to login if no token is found
    }
  }, [router]);

  // Fetch the test data
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
            alert("Failed to fetch the test");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching test:", error);
          setLoading(false);
        }
      };

      fetchTest();
    }
  }, [id]);

  // Handle answer selection
  const handleAnswerChange = (selectedOption) => {
    setAnswers({ ...answers, [currentQuestion]: selectedOption });
  };

  // Navigate to the next question
  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Navigate to the previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Submit the test
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(answers).length !== test.questions.length) {
      alert("Please answer all the questions.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/submit-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testId: id,
          studentId, // Use the extracted student ID
          answers,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult({
          totalScore: data.totalScore,
          maxScore: data.maxScore,
          message: data.message,
        });
      } else {
        const errorData = await response.json();
        alert(`Submission error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading test...</p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Test not found.</p>
      </div>
    );
  }

  // Calculate progress percentage based on answered questions
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / test.questions.length) * 100;

  const question = test.questions[currentQuestion];

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
            <Link href="/student/dashboard" className="hover:text-gray-200">
              لوحة التحكم
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-6">
        {/* Title and Description */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{test.title}</h1>
          <p className="text-gray-700">{test.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-4 mb-6">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* If result is available, display it */}
        {result ? (
          <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">نتيجة الاختبار</h2>
            <p className="text-lg text-gray-800">
              {result.message || "لقد أكملت الاختبار!"}
            </p>
            <p className="text-lg font-bold text-gray-800 mt-4">
              درجتك: {result.totalScore} / {result.maxScore}
            </p>
          </div>
        ) : (
          <>
            {/* Question */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
              {/* Question Image */}
              {question.image && (
                <div className="flex justify-center">
                  <img
                    src={question.image}
                    alt={`Question ${currentQuestion + 1}`}
                    className="rounded-md shadow-md max-h-60"
                  />
                </div>
              )}

              {/* Question Text */}
              <h2 className="text-lg font-bold text-gray-800">
                {currentQuestion + 1}. {question.question}
              </h2>

              {/* Options */}
              {question.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="block mt-2 text-gray-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={optionIndex}
                    checked={answers[currentQuestion] === optionIndex}
                    onChange={() => handleAnswerChange(optionIndex)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevious}
                className={`px-6 py-2 rounded-lg shadow ${
                  currentQuestion === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={currentQuestion === 0}
              >
                السابق
              </button>

              {currentQuestion === test.questions.length - 1 ? (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={`px-6 py-2 rounded-lg shadow ${
                    submitting
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                  disabled={submitting}
                >
                  {submitting ? "جارٍ الإرسال..." : "إرسال الاختبار"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className={`px-6 py-2 rounded-lg shadow ${
                    answers[currentQuestion] === undefined
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
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
