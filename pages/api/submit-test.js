import dbConnect from "../../app/utils/dbconnect";
import StudentAnswer from "../../app/models/studentanswer";
import Test from "../../app/models/test"; // Assuming you already have a Test model

export default async function handler(req, res) {
  await dbConnect(); // Ensure database connection

  if (req.method === "POST") {
    const { testId, studentId, answers } = req.body;

    if (!testId || !studentId || !answers) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      // Fetch the test to calculate the score
      const test = await Test.findById(testId);
      if (!test) {
        return res.status(404).json({ error: "Test not found." });
      }

      // Calculate the score
      let totalScore = 0;
      test.questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          totalScore++;
        }
      });

      // Check if the student has already taken the test
      const existingSubmission = await StudentAnswer.findOne({ testId, studentId });

      if (existingSubmission) {
        // Remove the previous submission
        await StudentAnswer.deleteOne({ _id: existingSubmission._id });
      }

      // Save the new answers to the database
      const studentAnswer = new StudentAnswer({
        testId,
        studentId,
        answers,
        totalScore,
        isGraded: true, // Set to true as we calculate the score immediately
      });

      await studentAnswer.save();

      return res.status(201).json({
        message: "Test submitted successfully!",
        totalScore,
        maxScore: test.questions.length,
      });
    } catch (error) {
      console.error("Error submitting test:", error);
      return res.status(500).json({ error: "Error saving test submission." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
