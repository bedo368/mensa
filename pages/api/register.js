import dbConnect from "../../app/utils/dbconnect";
import User from "../../app/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, email, password, age } = req.body;

    // التحقق من صحة البيانات
    if (!name || !email || !password || !age) {
      return res.status(400).json({ error: "يرجى إدخال جميع الحقول." });
    }

    try {
      // التحقق من وجود المستخدم مسبقًا
      const existingUser = await User.findOne({email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ error: "البريد الإلكتروني مسجل بالفعل." });
      }

      // تشفير كلمة المرور
      const hashedPassword = await bcrypt.hash(password, 10);

      // إنشاء المستخدم
      const user = await User.create({
        name,
        email:email.toLowerCase(),
        password: hashedPassword,
        age,
        role: "Student",
      });

      // إنشاء JWT مع معلومات المستخدم
      const token = jwt.sign(
        {
          id: user._id,       // معرف المستخدم
          name: user.name,    // اسم المستخدم
          email: user.email,  // البريد الإلكتروني
          age: user.age,      // العمر
          type: user.role || "Student", // الدور (افتراضي "user" إذا لم يتم تعريفه)
        },
        "your_secret_key", // المفتاح السري للتشفير
        { expiresIn: "1h" }     // مدة صلاحية التوكن
      );

      // إرسال التوكن إلى الفرونت
      res.status(201).json({ message: "تم التسجيل بنجاح", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "حدث خطأ أثناء إنشاء الحساب." });
    }
  } else {
    res.status(405).json({ error: "الطريقة غير مدعومة." });
  }
}
