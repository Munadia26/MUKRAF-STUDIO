import express from "express";
import { getAllProducts, getProductBySlug, createProduct, deleteProduct } from "../controllers/productcontroller.js";
import { upload } from "../middlewares/upload.js";
import { updateProduct } from "../controllers/productcontroller.js";
import { verifyToken,authorize } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);
router.post("/", upload.single("image"), verifyToken, authorize("ADMIN"), createProduct);
router.put("/:id", upload.single("image"), verifyToken, authorize("ADMIN"), updateProduct);
router.delete("/:id", verifyToken, authorize("ADMIN"), deleteProduct);

export default router;