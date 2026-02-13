import { prisma } from "../config/prisma.js";
import { comparePassword, generateAccessToken, generateRefreshToken } from "../utils/auth.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

export const login = catchAsync(async (req, res) => {
  const { name, password } = req.body;

  // Cari berdasarkan name
  const user = await prisma.user.findUnique({ where: { name } });
  
  if (!user || !(await comparePassword(password, user.password))) {
    throw new AppError("Username atau Password salah", 401);
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role, name: user.name });
  const refreshToken = generateRefreshToken();

  // Simpan token ke DB
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id }
  });

  res.json({
    success: true,
    data: { accessToken, refreshToken, user: { name: user.name, role: user.role } }
  });
});

export const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError("Refresh Token diperlukan untuk logout", 400);
  }

  // Hapus refresh token dari database agar tidak bisa digunakan lagi
  await prisma.refreshToken.deleteMany({
    where: { token: refreshToken }
  });

  res.status(200).json({
    success: true,
    message: "Berhasil logout, sesi telah dihapus."
  });
});