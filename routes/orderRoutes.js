import express from "express";
import { verifyToken } from "../middleware/auth";
import * as orderController from "../controllers/orderController";

const router = express.Router();

/**
 * @swagger
 * /order/getOrder:
 *   get:
 *     summary: ดึงข้อมูลออเดอร์ทั้งหมด
 *     tags:
 *      - Orders
 *     security:
 *      - bearerAuth: []
 *     responses:
 *         200:
 *           description : ข้อมูลออเดอร์ทั้งหมด
 *         401:
 *           description : Token ไม่ถูกต้อง
 */
router.get("/getOrder", verifyToken, orderController.getOrderById);

/**
 * @swagger
 * /order/getOrder/{id}:
 *   get:
 *     summary: ดึงข้อมูลออเดอร์ตามไอดี
 *     tags:
 *      - Orders
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID ออเดอร์
 *        schema:
 *           type: string
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลลูกค้าที่กรอกไอดีเข้ามา
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.get("/getOrder/:id", verifyToken, orderController.getOrderById);

/**
 * @swagger
 * /order/getOrderAndCustomer/{id}:
 *  get:
 *      summary: ดึงข้อมูลออเดอร์และลูกค้าตามไอดี
 *      tags:
 *       - Orders
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ออเดอร์
 *         schema:
 *            type: string
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: ข้อมูลออเดอร์และลูกค้าที่กรอกไอดีเข้ามา
 *          401:
 *              description: Token ไม่ถูกต้อง
 */
router.get(
  "/getOrderAndCustomer/:id",
  verifyToken,
  orderController.getOrderAndCustomer
);

/**
 * @swagger
 *  /order/saveOrder:
 *  post:
 *      summary: เพิ่มข้อมูลออเดอร์
 *      tags:
 *          - Orders
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: number
 *                 example   : 0
 *               total_amount:
 *                 type: number
 *                 example : 5700
 *      responses:
 *          200:
 *              description: ข้อมูลออเดอร์และลูกค้าที่กรอกไอดีเข้ามา
 */
router.post("/saveOrder", verifyToken, orderController.saveOrder);

/**
 * @swagger
 *  /order/updateStatus:
 *  put:
 *      summary: อัเพเดทข้อมูลสเตตัสของออเดอร์
 *      tags:
 *          - Orders
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example   : 0
 *               status:
 *                 type: string
 *                 example : "cancelled"
 *      responses:
 *          200:
 *              description: อัเพเดทข้อมูลสเตตัสของออเดอร์เรียบร้อยเเล้ว
 */
router.put("/updateStatus", verifyToken, orderController.updateStatus);

/**
 * @swagger
 * /order/deleteOrder:
 *   delete:
 *     summary: ลบออเดอร์ตามไอดี
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: int
 *                 example : 0
 *     responses:
 *       200:
 *         description: ลบออเดอร์ตามไอดี
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.delete("/deleteOrder", verifyToken, orderController.deleteOrder);

export default router;
