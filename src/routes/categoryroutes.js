<<<<<<< HEAD
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

=======
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

>>>>>>> master
export default router;