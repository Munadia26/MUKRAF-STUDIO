import express from "express";
import cors from "cors";
import authRoutes from "./authroutes.js"; // Pastikan nama file sesuai
import articleRoutes from "./articleroutes.js";
import profileroutes from "./profileroutes.js";
import productroutes from "./productroutes.js";
import categoryroutes from "./categoryroutes.js";
import memberroutes from "./memberroutes.js";
import { getDashboardStats } from "../controllers/dashboardcontroller.js"; 

const router = express.Router();

// Middleware CORS untuk router ini
router.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- DAFTAR ROUTE ---

// Gunakan 'router', bukan 'app' di sini
router.use("/auth", authRoutes); 
router.get("/dashboard/stats", getDashboardStats); 

router.use("/articles", articleRoutes);
router.use("/profile", profileroutes);
router.use("/products", productroutes); 
router.use("/categories", categoryroutes); 
router.use("/member", memberroutes);

export default router;