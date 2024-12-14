import dbConnect from "../../../app/utils/dbconnect";
import StudentAnswer from "../../../app/models/studentanswer";
import Test from "../../../app/models/test";

export default async function handler(req, res) {
  const { studentId } = req.query;

  await dbConnect();

  if (!studentId) {
    return res.status(400).json({ error: "Student ID is required." });
  }

  if (req.method === "GET") {
    try {
      // استرداد جميع الاختبارات التي أكملها الطالب مع الدرجات
      const completedTests = await StudentAnswer.find({ studentId })
        .populate("testId", "title") // الحصول على عنوان الاختبار من جدول الاختبارات
        .sort({ createdAt: -1 }); // ترتيب الاختبارات من الأحدث إلى الأقدم

      res.status(200).json(completedTests);
    } catch (error) {
      console.error("Error fetching student tests:", error);
      res.status(500).json({ error: "Error fetching student tests." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
