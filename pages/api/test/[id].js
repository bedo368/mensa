import dbConnect from "../../../app/utils/dbconnect";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

// Define the Test model
const TestSchema = new mongoose.Schema({
  title: String,
  questionCount: Number,
});

const Test = mongoose.models.Test || mongoose.model("Test", TestSchema);

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      // Connect to the database
      await dbConnect();

      // Use the Mongoose model to delete the document
      const result = await Test.deleteOne({ _id: id });

      if (result.deletedCount === 1) {
        return res.status(200).json({ message: "Test deleted successfully" });
      } else {
        return res.status(404).json({ message: "Test not found" });
      }
    } catch (error) {
      console.error("Error deleting test:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
