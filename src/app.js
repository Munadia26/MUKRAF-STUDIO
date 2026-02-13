import express from "express";
import path from "path"; // Tambahkan ini untuk mengatur folder uploads
import router from "./routes/index.js"; 
import { errorhandler } from "./middlewares/errorhandler.js"; 

const app = express();
const PORT = 3000;

// --- MIDDLEWARES ---

// 1. Membaca kiriman format JSON
app.use(express.json());

// 2. WAJIB: Membaca kiriman format Form-Data (Teks)
app.use(express.urlencoded({ extended: true }));

// 3. Folder Statis: Supaya gambar di folder 'uploads' bisa diakses via URL
// Contoh: http://localhost:3000/uploads/nama-gambar.jpg
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// --- ROUTES ---

app.get("/", (req, res) => {
    res.json({ message: "API Active" });
});

// Daftarkan router utama
app.use("/api/v1", router);

// --- ERROR HANDLING ---

// WAJIB DI PALING BAWAH setelah semua route
app.use(errorhandler);

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});