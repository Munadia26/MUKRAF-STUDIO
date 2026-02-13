import { Router } from "express";
import { 
  createArticle, 
  getAllArticles, 
  getArticleByTitle,
  updateArticle, 
  deleteArticle 
} from "../controllers/articlecontroller.js";
import { upload } from "../middlewares/upload.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @route   GET /api/v1/articles
 * @desc    Mengambil semua data artikel
 */
router.get("/", getAllArticles);

router.get("/detail/:title", getArticleByTitle);
/**
 * @route   POST /api/v1/articles
 * @desc    Menambah artikel baru (Judul, Konten, Gambar)
 */
router.post("/", upload.single("image"), verifyToken, createArticle);

/**
 * @route   PUT /api/v1/articles/:id
 * @desc    Update data artikel berdasarkan ID
 */
router.put("/:id", upload.single("image"), verifyToken, updateArticle);

/**
 * @route   DELETE /api/v1/articles/:id
 * @desc    Menghapus artikel berdasarkan ID
 */
router.delete("/:id", verifyToken, deleteArticle);

export default router;