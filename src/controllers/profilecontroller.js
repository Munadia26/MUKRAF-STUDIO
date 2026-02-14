import { PrismaClient } from "@prisma/client";
import fs from "fs";
import fsPromises from "fs/promises";

import path from "path";

const prisma = new PrismaClient();

// Ambil data profil untuk Landing Page
export const getProfile = async (req, res, next) => {
  try {
    const profile = await prisma.profile.findFirst();
    res.status(200).json({ 
      success: true, 
      data: profile || { message: "Data profil masih kosong" } 
    });
  } catch (error) {
    next(error);
  }
};

// Simpan atau Perbarui Profil
export const updateProfile = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const logo = req.file ? req.file.filename : undefined;

    if (!name || !description) {
      return res.status(400).json({ message: "Nama dan Deskripsi wajib diisi!" });
    }

    const existingProfile = await prisma.profile.findFirst();

    if (existingProfile) {
      // Perbaikan logika hapus logo lama
      if (logo && existingProfile.logo) {
        const oldPath = path.join(process.cwd(), "uploads", existingProfile.logo);
        
        // Menggunakan fs.existsSync (dari modul standar)
        if (fs.existsSync(oldPath)) {
          // Menggunakan fsPromises.unlink untuk menghapus file
          await fsPromises.unlink(oldPath); 
        }
      }

      const updated = await prisma.profile.update({
        where: { id: existingProfile.id },
        data: { name, description, ...(logo && { logo }) },
      });
      return res.status(200).json({ message: "Profil diperbarui", data: updated });
    }

    const created = await prisma.profile.create({
      data: { name, description, logo },
    });
    res.status(201).json({ message: "Profil berhasil dibuat", data: created });
  } catch (error) {
    next(error);
  }
};