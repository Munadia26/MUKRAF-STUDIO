<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";

// Inisialisasi Prisma Client dengan logging aktif
export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
=======
import { PrismaClient } from "@prisma/client";

// Inisialisasi Prisma Client dengan logging aktif
export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
>>>>>>> master
});