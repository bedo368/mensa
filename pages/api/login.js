import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnect from "../../app/utils/dbconnect";
import User from "../../app/models/user";

const SECRET_KEY = "your_secret_key"; // استخدم مفتاحًا سريًا قويًا وآمنًا

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    await dbConnect();

    // تحقق من وجود المستخدم
    const user = await User.findOne({email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ error: "المستخدم غير موجود." });
    }

    // تحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "كلمة المرور غير صحيحة." });
    }

    // إنشاء التوكن
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email.toLowerCase(),
        type: user.role, // نوع المستخدم (admin أو student)
      },
      SECRET_KEY,
      { expiresIn: "1h" } // مدة صلاحية التوكن
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "حدث خطأ ما." });
  }
}
