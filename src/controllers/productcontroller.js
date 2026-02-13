import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// 1. GET ALL (Ringan, tanpa description panjang)
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            include: { category: { select: { name: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

// 2. GET DETAIL (Menggunakan Slug)
export const getProductBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const product = await prisma.product.findUnique({
            where: { slug },
            include: { category: true }
        });
        if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// 3. CREATE PRODUCT
export const createProduct = async (req, res, next) => {
    try {
        const { title, description, link, categoryId } = req.body;
        const image = req.file?.filename;

        if (!title || !description || !image || !categoryId) {
            return res.status(400).json({ message: "Data tidak lengkap!" });
        }

        // Generate Slug otomatis
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const product = await prisma.product.create({
            data: { 
                title, 
                slug, 
                description, 
                link, 
                image, 
                categoryId: Number(categoryId) 
            },
        });

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, link, categoryId } = req.body;
        const image = req.file?.filename;

        // 1. Cek apakah produk ada
        const existingProduct = await prisma.product.findUnique({
            where: { id: Number(id) }
        });

        if (!existingProduct) return res.status(404).json({ message: "Produk tidak ditemukan" });

        // 2. Jika ada gambar baru, hapus gambar lama dari folder
        if (image && existingProduct.image) {
            const oldPath = path.join(process.cwd(), "uploads", existingProduct.image);
            await fs.unlink(oldPath).catch(() => {}); 
        }

        // 3. Generate slug baru jika judul berubah
        const slug = title ? title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : existingProduct.slug;

        const updated = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                title,
                slug,
                description,
                link,
                categoryId: Number(categoryId),
                ...(image && { image }) // Hanya ganti image jika ada file baru
            }
        });

        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
};
// 4. DELETE PRODUCT
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({ where: { id: Number(id) } });

        if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

        if (product.image) {
            const filePath = path.join(process.cwd(), "uploads", product.image);
            await fs.unlink(filePath).catch(() => {}); // Delete asinkron
        }

        await prisma.product.delete({ where: { id: Number(id) } });
        res.status(200).json({ message: "Produk berhasil dihapus" });
    } catch (error) {
        next(error);
    }
};