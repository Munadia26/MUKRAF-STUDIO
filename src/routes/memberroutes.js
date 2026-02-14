<<<<<<< HEAD
import { Router } from "express";
import { 
    createMember, 
    getAllMembers, 
    deleteMember,
    updateMember // 1. Pastikan fungsi ini di-import!
} from "../controllers/membercontroller.js";
import { upload } from "../middlewares/upload.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @route   GET /api/v1/member
 * @desc    Mengambil semua data member tim
 */
router.get("/", getAllMembers);

/**
 * @route   POST /api/v1/member
 * @desc    Menambah member baru (Nama, Jabatan, Foto)
 */
router.post("/", upload.single("image"), verifyToken, createMember);

/**
 * @route   PUT /api/v1/member/:id
 * @desc    Update data member berdasarkan ID
 */
// 2. TAMBAHKAN BARIS INI:
router.put("/:id", upload.single("image"), verifyToken, updateMember);

/**
 * @route   DELETE /api/v1/member/:id
 * @desc    Menghapus member berdasarkan ID
 */
router.delete("/:id", verifyToken, deleteMember);

=======
import { Router } from "express";
import { 
    createMember, 
    getAllMembers, 
    deleteMember,
    updateMember // 1. Pastikan fungsi ini di-import!
} from "../controllers/membercontroller.js";
import { upload } from "../middlewares/upload.js";
import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @route   GET /api/v1/member
 * @desc    Mengambil semua data member tim
 */
router.get("/", getAllMembers);

/**
 * @route   POST /api/v1/member
 * @desc    Menambah member baru (Nama, Jabatan, Foto)
 */
router.post("/", upload.single("image"), verifyToken, authorize("ADMIN"), createMember);

/**
 * @route   PUT /api/v1/member/:id
 * @desc    Update data member berdasarkan ID
 */
// 2. TAMBAHKAN BARIS INI:
router.put("/:id", upload.single("image"), verifyToken, authorize("ADMIN"), updateMember);

/**
 * @route   DELETE /api/v1/member/:id
 * @desc    Menghapus member berdasarkan ID
 */
router.delete("/:id", verifyToken,authorize("ADMIN"), deleteMember);

>>>>>>> master
export default router;