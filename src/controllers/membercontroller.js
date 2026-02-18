import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// 1. TAMBAH MEMBER
export const createMember = async (req, res, next) => {
  try {
    const { name } = req.body;
    const image = req.file?.filename;

    if (!name || !image) {
      return res.status(400).json({ success: false, message: "Nama dan Foto wajib diisi!" });
    }

    const member = await prisma.member.create({
      data: { name, image }
    });

    res.status(201).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

// 2. AMBIL SEMUA
export const getAllMembers = async (req, res, next) => {
  try {
    const members = await prisma.member.findMany();
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};

// 3. EDIT MEMBER
export const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const newImage = req.file?.filename;

    const oldMember = await prisma.member.findUnique({
      where: { id: Number(id) }
    });

    if (!oldMember) return res.status(404).json({ message: "Member tidak ditemukan" });

    // Hapus foto lama jika ada upload foto baru
    if (newImage && oldMember.image) {
      const oldPath = path.join(process.cwd(), "uploads", oldMember.image);
      await fs.unlink(oldPath).catch(() => console.log("File lama tidak ditemukan."));
    }

    const updatedMember = await prisma.member.update({
      where: { id: Number(id) },
      data: {
        name: name || oldMember.name,
        image: newImage || oldMember.image
      }
    });

    res.status(200).json({ success: true, data: updatedMember });
  } catch (error) {
    next(error);
  }
};

// 4. HAPUS MEMBER
export const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await prisma.member.findUnique({ where: { id: Number(id) } });

    if (!member) return res.status(404).json({ message: "Member tidak ditemukan" });

    // Hapus file fisik
    const filePath = path.join(process.cwd(), "uploads", member.image);
    await fs.unlink(filePath).catch(() => null);

    await prisma.member.delete({ where: { id: Number(id) } });
    res.status(200).json({ success: true, message: "Member berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};