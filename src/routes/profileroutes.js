import express from "express";
import { getProfile, updateProfile } from "../controllers/profilecontroller.js";
import { upload } from "../middlewares/upload.js"; // Gunakan middleware multer yang sudah ada
import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProfile);
router.post("/", upload.single("logo"), verifyToken, authorize("ADMIN"), updateProfile); // Kita gunakan POST/PUT untuk upsert

export default router;