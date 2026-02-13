import { PrismaClient } from "@prisma/client";
import fs from "fs/promises"; // Gunakan fs/promises agar lebih modern
import path from "path";

const prisma = new PrismaClient();

// 1. CREATE
export const createMember = async (req, res, next) => {
  try {
    const { name, position } = req.body;
    const image = req.file?.filename;

    if (!name || !position || !image) {
      return res.status(400).json({ success: false, message: "Nama, Jabatan, dan Foto wajib diisi!" });
    }

    const member = await prisma.member.create({
      data: { name, position, image }
    });

    res.status(201).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

// 2. READ ALL
export const getAllMembers = async (req, res, next) => {
  try {
    const members = await prisma.member.findMany();
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};

// 3. UPDATE (Fungsi yang tadi hilang)
export const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, position } = req.body;
    const newImage = req.file?.filename;

    // Cari data lama
    const oldMember = await prisma.member.findUnique({
      where: { id: Number(id) }
    });

    if (!oldMember) return res.status(404).json({ message: "Member tidak ditemukan" });

    // Jika ada upload foto baru, hapus foto yang lama biar gak nyampah di folder uploads
    if (newImage) {
      const oldPath = path.join(process.cwd(), "uploads", oldMember.image);
      await fs.unlink(oldPath).catch(() => console.log("File lama tidak ditemukan, abaikan."));
    }

    const updatedMember = await prisma.member.update({
      where: { id: Number(id) },
      data: {
        name: name || oldMember.name,
        position: position || oldMember.position,
        image: newImage || oldMember.image
      }
    });

    res.status(200).json({ success: true, data: updatedMember });
  } catch (error) {
    next(error);
  }
};

// 4. DELETE
export const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await prisma.member.findUnique({ where: { id: Number(id) } });

    if (!member) return res.status(404).json({ message: "Member tidak ditemukan" });

    const filePath = path.join(process.cwd(), "uploads", member.image);
    await fs.unlink(filePath).catch(() => {});

    await prisma.member.delete({ where: { id: Number(id) } });
    res.status(200).json({ success: true, message: "Member berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};