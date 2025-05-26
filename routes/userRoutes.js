import express from "express";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: เข้าสู่ระบบ
 *     tags:
 *       - Users
 *     requestBody:
 *       description: ข้อมูลสำหรับล็อกอิน
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
 *                 example : admin
 *               password:
 *                 type: string
 *                 example : 123456
 *     responses:
 *       200:
 *         description: เข้าสู่ระบบสำเร็จ
 *       401:
 *         description: ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
 */
router.post("/login", userController.loginController);

//CRUD
//Create
/**
 * @swagger
 * /register:
 *   post:
 *     summary: ลงทะเบียนผู้ใช้ใหม่
 *     tags:
 *       - Users
 *     requestBody:
 *       description: ข้อมูลสำหรับการลงทะเบียนผู้ใช้
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
router.post(
  "/register",
  upload.single("image"),
  userController.registerController
);

//Read
/**
 * @swagger
 * /getAllUser:
 *   get:
 *     summary: ดึงข้อมูลผู้ใช้ทั้งหมด
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: รายชื่อผู้ใช้ทั้งหมด
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getAllUser", verifyToken, userController.getAllUserController);

/**
 * @swagger
 * /getImage/{uid}:
 *   get:
 *     summary: ดึงข้อมูลรูปภาพของผู้ใช้
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ของผู้ใช้
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: รูปภาพของผู้ใช้
 *       404:
 *         description: ไม่พบผู้ใช้
 */
router.get("/getImage/:uid", verifyToken, userController.getImageController);

/**
 * @swagger
 * /getFullname/{uid}:
 *   get:
 *     summary: ดึงชื่อเต็มของผู้ใช้
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ของผู้ใช้
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ชื่อเต็มของผู้ใช้
 *       404:
 *         description: ไม่พบผู้ใช้
 */
router.get(
  "/getFullname/:uid",
  verifyToken,
  userController.getFullnameController
);

//Update
/**
 * @swagger
 * /updateUser/{uid}:
 *   put:
 *     summary: อัปเดตข้อมูลผู้ใช้
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: UID ของผู้ใช้ที่ต้องการอัปเดต
 *         schema:
 *           type: string
 *     requestBody:
 *       description: ข้อมูลที่ต้องการอัปเดต
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: อัปเดตข้อมูลสำเร็จ
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *       404:
 *         description: ไม่พบผู้ใช้
 */
router.put(
  "/updateUser/:uid",
  upload.single("image"),
  verifyToken,
  userController.updateUserController
);

//Delete
/**
 * @swagger
 * /delete/{uid}:
 *   delete:
 *     summary: ลบผู้ใช้
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: UID ของผู้ใช้ที่ต้องการลบ
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ลบผู้ใช้สำเร็จ
 *       404:
 *         description: ไม่พบผู้ใช้
 */
router.delete("/delete/:uid", verifyToken, userController.deleteUserController);

export default router;
