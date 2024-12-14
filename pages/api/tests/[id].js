import dbConnect from "../../../app/utils/dbconnect";
import Test from "../../../app/models/test";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const test = await Test.findById(id);
      if (!test) {
        return res.status(404).json({ error: "Test not found" });
      }
      res.status(200).json(test);
    } catch (error) {
      console.error("Error fetching test:", error);
      res.status(500).json({ error: "Error fetching test" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
