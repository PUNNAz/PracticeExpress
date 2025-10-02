import express from "express";
import { verifyToken } from "../middleware/auth.js";
import * as productController from "../controllers/productController.js";

const router = express.Router();

/**
 * @swagger
 * /product/saveProduct:
 *   post:
 *     summary: เพิ่มข้อมูลหรืออัพเดทข้อมูลสินค้า
 *     tags:
 *       - Products
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
 *         description: สินค้าถูกสร้างหรืออัพเดทสำเร็จเเล้ว
 */
router.post("/saveProduct", verifyToken, productController.saveProduct);

/**
 * @swagger
 * /product/getProducts:
 *   get:
 *     summary: ดึงข้อมูลสินค้าทั้งหมด
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลสินค้าทั้งหมด
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getProducts", verifyToken, productController.getProductByID);

/**
 * @swagger
 * /product/getProducts/{id}:
 *   get:
 *     summary: ดึงข้อมูลสินค้าตามไอดี
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ของสินค้า
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลสินค้าที่กรอกไอดีเข้ามา
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getProducts/:id", verifyToken, productController.getProductByID);

/**
 * @swagger
 * /product/getAllProduct:
 *   get:
 *     summary: ดึงข้อมูลสินค้าทั้งหมด
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลสินค้าทั้งหมด
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getAllProduct", verifyToken, productController.getAllProduct);

/**
 * @swagger
 * /product/getAveragePrice:
 *   get:
 *     summary: ดึงข้อมูลราคาสินค้าเฉลี่ย
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลราคาสินค้าเฉลี่ย
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getAveragePrice", verifyToken, productController.getAveragePrice);

/**
 * @swagger
 * /product/getMaxPriceByName:
 *   get:
 *     summary: ดึงข้อมูลราคาสูงสุดของสินค้าตามชื่อ
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลราคาสูงสุดของสินค้าตามชื่อ
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getMaxPriceByName", verifyToken, productController.getMaxPriceByName);

/**
 * @swagger
 * /product/deleteProduct:
 *   delete:
 *     summary: ลบสินค้าตามไอดี
 *     tags:
 *       - Products
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
 *         description: ลบสินค้าตามไอดี
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.delete("/deleteProduct", verifyToken, productController.deleteProduct);

export default router;
