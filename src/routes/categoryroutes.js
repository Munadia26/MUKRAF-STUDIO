import { Router } from "express";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categorycontroller.js";
import { verifyToken, authorize } from "../middlewares/authMiddleware.js"; // Import authorize

const router = Router();

// Semua orang bisa melihat kategori (Public)
router.get("/", getAllCategories);

// Hanya ADMIN yang bisa Create, Update, Delete
router.post("/", verifyToken, authorize("ADMIN"), createCategory);
router.put("/:id", verifyToken, authorize("ADMIN"), updateCategory);
router.delete("/:id", verifyToken, authorize("ADMIN"), deleteCategory);

export default router;