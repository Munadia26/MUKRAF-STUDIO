import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// 1. CREATE - Tetap sama
export const createArticle = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null;
        if (!title || !description) return res.status(400).json({ message: "Judul dan deskripsi wajib diisi!" });

        const newArticle = await prisma.article.create({ data: { title, description, image } });
        res.status(201).json({ success: true, data: newArticle });
    } catch (error) { next(error); }
};

// 2. READ - Tetap sama
export const getAllArticles = async (req, res, next) => {
    try {
        const articles = await prisma.article.findMany({ orderBy: { id: "desc" } });
        res.status(200).json({ success: true, data: articles });
    } catch (error) { next(error); }
};

// Tambahkan fungsi ini di articlecontroller.js
export const getArticleByTitle = async (req, res, next) => {
    try {
        const { title } = req.params;
        
        // Mengubah "judul-artikel-ini" kembali menjadi "judul artikel ini"
        const originalTitle = title.replace(/-/g, ' ');

        const article = await prisma.article.findFirst({
            where: {
                title: {
                    equals: originalTitle,
                    mode: 'insensitive' // Agar tidak masalah jika huruf besar/kecil berbeda
                }
            }
        });

        if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
        
        res.status(200).json({ success: true, data: article });
    } catch (error) {
        next(error);
    }
};

// 3. UPDATE - Perbaikan fs.unlinkSync ke fs.unlink
export const updateArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const oldArticle = await prisma.article.findUnique({ where: { id: Number(id) } });

        if (!oldArticle) return res.status(404).json({ message: "Artikel tidak ditemukan" });

        let imageName = oldArticle.image;
        if (req.file) {
            imageName = req.file.filename;
            if (oldArticle.image) {
                const oldPath = path.join(process.cwd(), "uploads", oldArticle.image);
                await fs.unlink(oldPath).catch(() => console.log("File lama tidak ditemukan")); 
            }
        }

        const updated = await prisma.article.update({
            where: { id: Number(id) },
            data: { title, description, image: imageName },
        });
        res.status(200).json({ success: true, data: updated });
    } catch (error) { next(error); }
};

// 4. DELETE - Perbaikan fs.existsSync & fs.unlinkSync
export const deleteArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await prisma.article.findUnique({ where: { id: Number(id) } });

        if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });

        if (article.image) {
            const filePath = path.join(process.cwd(), "uploads", article.image);
            // Gunakan catch agar proses DB tetap jalan meski file fisik tidak ditemukan
            await fs.unlink(filePath).catch(() => console.log("File tidak ditemukan di folder uploads"));
        }

        await prisma.article.delete({ where: { id: Number(id) } });
        res.status(200).json({ success: true, message: "Artikel berhasil dihapus" });
    } catch (error) { next(error); }
};