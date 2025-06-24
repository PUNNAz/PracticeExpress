import express from "express";
import { verifyToken } from "../middleware/auth";
import * as customerController from "../controllers/customerController";

const router = express.Router();

/**
 * @swagger
 * /customer/registerCustomer:
 *   post:
 *     summary: เพิ่มข้อมูลลูกค้า
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example   : ""
 *               last_name:
 *                 type: string
 *                 example : ""
 *               email:
 *                 type: string
 *                 example : ""
 *               phone:
 *                 type: string
 *                 example : ""
 *               address:
 *                 type: string
 *                 example : ""
 *     responses:
 *       200:
 *         description: ข้อมูลลูกค้าถูกสร้างสำเร็จเเล้ว
 */
router.post(
  "/registerCustomer",
  verifyToken,
  customerController.registerCustomer
);

/**
 * @swagger
 * /customer/updateCustomer:
 *   put:
 *     summary: อัพเดทข้อมูลลูกค้า
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: ข้อมูลที่ต้องการอัปเดต
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *                 example: "123"
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *     responses:
 *       200:
 *         description: ข้อมูลลูกค้าถูกสร้างสำเร็จ
 */
router.put("/updateCustomer", verifyToken, customerController.updateCustomer);

/**
 * @swagger
 * /customer/getCustomer:
 *   get:
 *     summary: ดึงข้อมูลลูกค้าทั้งหมด
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลลูกค้าทั้งหมด
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getCustomer", verifyToken, customerController.getCustomerById);

/**
 * @swagger
 * /customer/getCustomer/{id}:
 *   get:
 *     summary: ดึงข้อมูลลูกค้าตามไอดี
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ของลูกค้า
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลลูกค้าที่กรอกไอดีเข้ามา
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getCustomer/:id", verifyToken, customerController.getCustomerById);

/**
 * @swagger
 * /customer/deleteCustomer:
 *   delete:
 *     summary: ลบลูกค้าตามไอดี
 *     tags:
 *       - Customers
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
 *         description: ลบลูกค้าตามไอดี
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.delete(
  "/deleteCustomer",
  verifyToken,
  customerController.deleteCustomer
);

export default router;
