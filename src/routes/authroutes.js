import { Router } from "express";
import {
  login,
  refreshToken,
  logout,
  getMe,
} from "../controllers/authcontroller.js"; // Pastikan penulisan file sesuai (authcontroller.js)
import { verifyToken } from "../middlewares/authMiddleware.js"; // Import middleware verifikasi

const router = Router();

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login menggunakan 'name' dan 'password'
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   POST /api/v1/auth/refresh-token
 * @desc    Memperbarui access token menggunakan refresh token
 * @access  Public (karena mengirim refresh token untuk divalidasi)
 */
router.post("/refresh-token", refreshToken);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user dan menghapus session di database
 * @access  Private (butuh verifyToken agar tahu siapa yang logout)
 */
router.post("/logout", verifyToken, logout);

/**
 * @route   GET /api/v1/auth/me
 * @desc    Mengambil profil user yang sedang login
 * @access  Private
 */
router.get("/me", verifyToken, getMe);

export default router;