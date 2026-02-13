import { Router } from "express";
import { logout, login } from "../controllers/authController.js";

const router = Router();

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login menggunakan 'name' dan 'password'
 * @access  Public
 */
router.post("/login", login);
router.post("/logout", logout);

// Jika nanti Anda menambah fitur logout atau refresh token, tambahkan di bawah sini:
// router.post("/logout", logout);
// router.post("/refresh-token", refreshToken);

export default router;