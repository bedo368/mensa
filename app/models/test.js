import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number,
  image: String, // URL for uploaded image
});

const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [QuestionSchema],
  questionCount: { type: Number, required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  totalMarks: { type: Number, required: true  },
  timeLimit: { type: Number, required: true  ,default: 60}, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Test || mongoose.model("Test", TestSchema);
