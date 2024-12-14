import mongoose from "mongoose";

const StudentAnswerSchema = new mongoose.Schema(
  {
    testId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Test" },
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // Assume you have a student system
    answers: { type: Map, of: Number, required: true }, // Map question index to selected option
    totalScore: { type: Number, default: 0 }, // Store the calculated score
    isGraded: { type: Boolean, default: false }, // To mark if grading is done
    submissionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.StudentAnswer ||
  mongoose.model("StudentAnswer", StudentAnswerSchema);
