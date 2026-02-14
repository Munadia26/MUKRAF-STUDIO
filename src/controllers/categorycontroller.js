import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Ambil semua kategori (GET)
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { products: true } } // Ini akan menampilkan jumlah produk di tiap kategori
      }
    });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// 2. Tambah kategori baru (POST)
export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Nama kategori wajib diisi" });

    // Generate slug otomatis (Web Design -> web-design)
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const category = await prisma.category.create({
      data: { name, slug }
    });
    
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

//BAGIAN UPDATE ATAU EDIT CATEGORY
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Nama kategori wajib diisi" });

    // Cek apakah kategori ada
    const existingCategory = await prisma.category.findUnique({
      where: { id: Number(id) }
    });

    if (!existingCategory) return res.status(404).json({ message: "Kategori tidak ditemukan" });

    // Generate slug baru dari nama baru
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data: { name, slug }
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
// 3. Hapus kategori (DELETE)
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};