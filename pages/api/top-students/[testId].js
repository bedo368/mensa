import mongoose from "mongoose";
import dbConnect from "../../../app/utils/dbconnect";
import StudentAnswer from "../../../app/models/studentanswer";
import Student from "../../../app/models/user";

export default async function handler(req, res) {
  await dbConnect();

  const { testId } = req.query;

  if (!testId) {
    return res.status(400).json({ error: "Test ID is required." });
  }

  if (req.method === "GET") {
    try {
      // Ensure testId is a valid ObjectId
      const testObjectId = new mongoose.Types.ObjectId(testId);

      // Fetch the top 10 students for the specific test, sorted by total score
      const topStudents = await StudentAnswer.find({ testId: testObjectId })
        .sort({ totalScore: -1 }) // Sort by totalScore in descending order
        .limit(10)
        .populate("studentId", "name"); // Populate the student name from the Student model
      console.log(topStudents)
      res.status(200).json(topStudents);
    } catch (error) {
      console.error("Error fetching top students:", error);
      res.status(500).json({ error: "Error fetching top students." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
