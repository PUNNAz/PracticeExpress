import express from "express";
import { verifyToken } from "../middleware/auth.js";
import * as productController from "../controllers/productController.js";

const router = express.Router();

/**
 * @swagger
 * /product/saveProduct:
 *   post:
 *     summary: เพิ่มข้อมูลหรืออัพเดทข้อมูลโปรดักส์
 *     tags:
 *       - products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example : 0
 *               name:
 *                 type: string
 *                 example : ""
 *               description:
 *                 type: string
 *                 example : ""
 *               price:
 *                 type: number
 *                 example : 12.34
 *               stock_quantity:
 *                 type: integer
 *                 example : 100
 *     responses:
 *       200:
 *         description: โปรดักส์ถูกสร้างหรืออัพเดทสำเร็จเเล้ว
 */
router.post("/saveProduct", verifyToken, productController.saveProduct);

/**
 * @swagger
 * /product/getProducts:
 *   get:
 *     summary: ดึงข้อมูลโปรดักส์ทั้งหมด
 *     tags:
 *       - products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลโปรดักส์ทั้งหมด
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getProducts", verifyToken, productController.getProductByID);

/**
 * @swagger
 * /product/getProducts/{id}:
 *   get:
 *     summary: ดึงข้อมูลโปรดักส์ตามไอดี
 *     tags:
 *       - products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ของโปรดักส์
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลโปรดักส์ที่กรอกไอดีเข้ามา
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getProducts/:id", verifyToken, productController.getProductByID);

/**
 * @swagger
 * /product/getAllProduct:
 *   get:
 *     summary: ดึงข้อมูลโปรดักส์ทั้งหมด
 *     tags:
 *       - products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลโปรดักส์ทั้งหมด
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getAllProduct", verifyToken, productController.getAllProduct);

/**
 * @swagger
 * /product/deleteProduct:
 *   delete:
 *     summary: ลบโปรดักส์ตามไอดี
 *     tags:
 *       - products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: int
 *                 example : 0
 *     responses:
 *       200:
 *         description: ข้อมูลโปรดักส์ทั้งหมด
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.delete("/deleteProduct", verifyToken, productController.deleteProduct);

export default router;
