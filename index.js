import express from "express";
import userRoutes from "./routes/userRoutes";
import { swaggerUi, specs } from "./swagger.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // ใช้ /api-docs

app.use("/", userRoutes);

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
// import pool from "./db";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { verifyToken } from "./middleware/auth";
// import upload from "./middleware/upload.js";

// app.get("/getAllUser", verifyToken, async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM Users");
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// app.post("/register", upload.single("image"), async (req, res) => {
//   const { username, email, password, firstname, lastname } = req.body;
//   const imageFile = req.file; // ไฟล์ที่อัปโหลดมา

//   if (!username || !email || !password) {
//     return res
//       .status(400)
//       .json({ error: "username, email, and password are required" });
//   }

//   try {
//     const [existingUsers] = await pool.query(
//       "SELECT * FROM Users WHERE username = ? OR email = ?",
//       [username, email]
//     );

//     if (existingUsers.length > 0) {
//       return res
//         .status(400)
//         .json({ error: "Username or email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10); // 10 คือ salt rounds
//     const imagePath = imageFile ? imageFile.filename : null;

//     const [result] = await pool.execute(
//       "INSERT INTO Users (username, email, password, firstname, lastname, image) VALUES (?, ?, ?, ?, ?, ?)",
//       [username, email, hashedPassword, firstname, lastname, imagePath]
//     );
//     res.status(201).json({
//       id: result.insertId,
//       username,
//       email,
//       firstname,
//       lastname,
//       imagePath,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ error: "username and password are required" });
//   }
//   try {
//     const [rows] = await pool.query("SELECT * FROM Users WHERE username = ?", [
//       username,
//     ]);
//     if (rows.length === 0) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     const user = rows[0];

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     // สร้าง JWT token (ใส่ข้อมูลที่ต้องการใน payload)
//     const token = jwt.sign(
//       {
//         id: user.UID,
//         username: user.username,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES }
//     );

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Database Error" });
//   }
// });
