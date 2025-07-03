import express from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { swaggerUi, specs } from "./swagger.js";
import {
  errorResponse,
  successResponse,
} from "./middleware/responseMessage.js";
import { Users } from "./model/users.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import upload from "./middleware/upload.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // ใช้ /api-docs

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/customer", customerRoutes);
app.use("/order", orderRoutes);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: เข้าสู่ระบบ
 *     tags:
 *       - Main
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: เข้าสู่ระบบสำเร็จ
 *       401:
 *         description: ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
 */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new Error("username and password are required");

  try {
    const user = await Users.findOne({
      where: { username: { [Op.eq]: username } },
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign(
      { id: user.UID, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    res.json({ token });
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
});

//Create
/**
 * @swagger
 * /register:
 *   post:
 *     summary: ลงทะเบียนผู้ใช้ใหม่
 *     tags:
 *       - Main
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: ""
 *               email:
 *                 type: string
 *                 example: ""
 *               password:
 *                 type: string
 *                 example: ""
 *               firstname:
 *                 type: string
 *                 example: ""
 *               lastname:
 *                 type: string
 *                 example: ""
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: ผู้ใช้ถูกสร้างแล้ว
 *       400:
 *         description: ข้อมูลไม่ครบถ้วนหรือซ้ำ
 */
app.post("/register", upload.single("image"), async (req, res) => {
  const body = req.body;
  const imageFile = req.file;
  const imagePath = imageFile ? imageFile.filename : null;

  if (!body.username || !body.email || !body.password) {
    throw new Error("username, email, and password are required");
  }

  const userData = { ...body, image: imagePath };
  try {
    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [
          { username: { [Op.eq]: userData.username } },
          { email: { [Op.eq]: userData.email } },
        ],
      },
    });

    if (existingUser) {
      throw new Error("Username or email already exists");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await Users.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      firstname: userData.firstname,
      lastname: userData.lastname,
      image: userData.image,
    });
    successResponse(res, user, "Register Success");
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
});

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
