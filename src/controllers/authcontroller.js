import { prisma } from "../config/prisma.js";
import { comparePassword, generateAccessToken, generateRefreshToken } from "../utils/auth.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

// Menggunakan 'export const' agar bisa diimport sebagai Named Export
export const login = catchAsync(async (req, res) => {
  const { name, password } = req.body;

  // Cari berdasarkan name sesuai skema DB Anda
  const user = await prisma.user.findUnique({ where: { name } });
  
  if (!user || !(await comparePassword(password, user.password))) {
    throw new AppError("Username atau Password salah", 401);s
  }
await prisma.refreshToken.deleteMany({
    where: { userId: user.id }
  });
  const accessToken = generateAccessToken({ id: user.id, role: user.role, name: user.name });
  const refreshToken = generateRefreshToken();

  // Simpan token ke DB
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id }
  });

  res.status(200).json({
    success: true,
    data: { 
      accessToken, 
      refreshToken, 
      user: { name: user.name, role: user.role } 
    }
  });
});

export const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError("Refresh Token tidak ditemukan", 400);
  }

  const storedToken = await prisma.refreshToken.findFirst({
    where: { token: refreshToken }
  });

  if (!storedToken) {
    throw new AppError("Refresh Token tidak valid", 403);
  }

  const user = await prisma.user.findUnique({ where: { id: storedToken.userId } });
  const newAccessToken = generateAccessToken({ id: user.id, role: user.role, name: user.name });

  res.json({
    success: true,
    data: { accessToken: newAccessToken }
  });
});

export const logout = catchAsync(async (req, res) => {
  // Menggunakan req.user.id dari verifyToken middleware
  const userId = req.user.id; 

  // Menghapus semua token 
  await prisma.refreshToken.deleteMany({
    where: { userId: userId }
  });

  res.status(200).json({
    success: true,
    message: "Berhasil logout, semua sesi dihapus."
  });
});

export const getMe = catchAsync(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, role: true }
  });

  res.json({
    success: true,
    data: user
  });
});