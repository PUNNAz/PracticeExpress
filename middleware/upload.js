import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // โฟลเดอร์เก็บไฟล์ ต้องสร้างโฟลเดอร์นี้เอง
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    // สร้าง hash จากชื่อไฟล์ต้นฉบับ + timestamp (หรือข้อมูลอื่น ๆ)
    const hash = crypto
      .createHash("sha256")
      .update(file.originalname + Date.now().toString())
      .digest("hex");

    // ใช้ hash + นามสกุลไฟล์เป็นชื่อไฟล์ใหม่
    const filename = `${hash}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });
export default upload;
