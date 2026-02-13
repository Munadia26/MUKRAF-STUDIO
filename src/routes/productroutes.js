import express from "express";
import { getAllProducts, getProductBySlug, createProduct, deleteProduct } from "../controllers/productcontroller.js";
import { upload } from "../middlewares/upload.js";
import { updateProduct } from "../controllers/productcontroller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);
router.post("/", upload.single("image"), verifyToken, createProduct);
router.put("/:id", upload.single("image"), verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;