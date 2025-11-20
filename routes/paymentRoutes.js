import express from "express";
import * as paymentController from "../controllers/paymentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, paymentController.getAllPaymentsController);
router.get(
  "/:paymentId",
  verifyToken,
  paymentController.getPaymentByIdController
);
router.post("/", verifyToken, paymentController.createPaymentController);
router.put(
  "/:paymentId",
  verifyToken,
  paymentController.updatePaymentController
);
router.delete(
  "/:paymentId",
  verifyToken,
  paymentController.deletePaymentController
);
router.get(
  "/order/:orderId",
  verifyToken,
  paymentController.getPaymentsByOrderIdController
);

export default router;
