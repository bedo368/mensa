import dbConnect from "../../../app/utils/dbconnect";
import Test from "../../../app/models/test"; // Import the Test model

export default async function handler(req, res) {
  await dbConnect(); // Ensure a connection to the database

  if (req.method === "GET") {
    // Fetch all tests, ordered from newest to oldest
    try {
      const tests = await Test.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
      console.log(tests)
      res.status(200).json(tests);
    } catch (error) {
      console.error("Error fetching tests:", error);
      res.status(500).json({ error: "Error fetching tests" });
    }
  } else if (req.method === "POST") {
    // Create a new test
    try {
      const { title, description, questions } = req.body;

      if (!title || !description || !Array.isArray(questions)) {
        return res
          .status(400)
          .json({ error: "Please provide title, description, and questions." });
      }

      const newTest = new Test({
        title,
        description,
        questions,
        createdAt: new Date(),
        questionCount: questions.length,
        
      });

      const savedTest = await newTest.save();
      res.status(201).json(savedTest);
    } catch (error) {
      console.error("Error creating test:", error);
      res.status(500).json({ error: "Error creating test" });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
