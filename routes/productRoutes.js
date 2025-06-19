import express from "express";
import { verifyToken } from "../middleware/auth.js";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.post("/saveProduct", verifyToken, productController.saveProduct);
router.get("/getProducts/:id", verifyToken, productController.getProductByID);
router.get("/getProducts", verifyToken, productController.getProductByID);
router.get("/getAllProduct", verifyToken, productController.getAllProduct);
router.delete("/deleteProduct", verifyToken, productController.deleteProduct);

export default router;
