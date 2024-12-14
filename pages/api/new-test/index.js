import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { nanoid } from "nanoid";
import dbConnect from "../../../app/utils/dbconnect";
import { storage } from "../../../app/utils/storage";
import Test from "../../../app/models/test";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle form-data
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form-data:", err);
          return res.status(400).json({ error: "Error parsing form-data" });
        }

     
        // Extract fields and convert them to strings
        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const description = Array.isArray(fields.description)
          ? fields.description[0]
          : fields.description;
        const questions = Array.isArray(fields.questions)
          ? fields.questions[0]
          : fields.questions;

        if (!title || !description || !questions) {
          return res
            .status(400)
            .json({ error: "Title, description, and questions are required" });
        }

        let parsedQuestions;
        try {
          parsedQuestions = JSON.parse(questions);
        } catch (parseError) {
          console.error("Error parsing questions JSON:", parseError);
          return res.status(400).json({ error: "Invalid questions JSON" });
        }

        const updatedQuestions = await Promise.all(
          parsedQuestions.map(async (question) => {
            // If the question has no image, return it as is
            if (!question.image || !files[question.image]) {
              return question;
            }

            // Handle image upload if an image is provided
            const fileArray = files[question.image];
            if (!Array.isArray(fileArray) || fileArray.length === 0) {
              console.error(`File is missing or invalid for ${question.image}`);
              return question; // Return unchanged question
            }

            const file = fileArray[0]; // Get the first file
            const uniqueFilename = `question-${nanoid()}.jpg`;
            const imageRef = ref(storage, `tests/${uniqueFilename}`);

            const fileBuffer = fs.readFileSync(file.filepath);

            await uploadBytes(imageRef, fileBuffer);

            const imageUrl = await getDownloadURL(imageRef);

            return { ...question, image: imageUrl }; // Replace image reference with URL
          })
        );

        const newTest = new Test({
          title,
          description,
          questions: updatedQuestions,
          questionCount: updatedQuestions.length,
          difficulty: "medium", 
          
        });

        await newTest.save();

        res.status(201).json({ message: "Test created successfully!" });
      });
    } catch (error) {
      console.error("Error while handling the request:", error);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed" });
  }
}
