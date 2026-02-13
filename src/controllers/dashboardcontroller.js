// 1. Gunakan kurung kurawal { prisma } karena Anda menggunakan Named Export
// 2. Pastikan path mengarah ke file prisma.js Anda dengan ekstensi .js
import { prisma } from "../config/prisma.js"; 

export const getDashboardStats = async (req, res, next) => {
  try {
    // Menggunakan Promise.all agar query berjalan paralel (lebih efisien)
    const [totalProducts, totalArticles, totalMembers] = await Promise.all([
      prisma.product.count(),
      prisma.article.count(),
      prisma.member.count(),
    ]);

    // Kirim response ke frontend
    res.status(200).json({
      status: "success",
      data: {
        totalProducts,
        totalArticles,
        totalMembers,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    
    // Memberikan respon error agar server tidak crash
    res.status(500).json({ 
      status: "error", 
      message: error.message || "Gagal mengambil data dari database" 
    });
  }
};