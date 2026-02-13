import { Router } from "express";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categorycontroller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = Router();

// Endpoint ini akan menjadi: GET /api/v1/categories
router.get("/", getAllCategories);

// Endpoint ini akan menjadi: POST /api/v1/categories
router.post("/", verifyToken, createCategory);

//untuk edit category
router.put("/:id", verifyToken, updateCategory);

// Endpoint ini akan menjadi: DELETE /api/v1/categories/:id
router.delete("/:id", verifyToken, deleteCategory);

export default router;