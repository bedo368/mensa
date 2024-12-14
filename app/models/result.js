// app/models/Result.js
import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Result || mongoose.model("Result", ResultSchema);
