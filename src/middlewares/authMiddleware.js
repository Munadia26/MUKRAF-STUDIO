<<<<<<< HEAD
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Akses ditolak" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "rahasia-admin-akk");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Sesi kadaluwarsa" });
  }
=======
import jwt from "jsonwebtoken";

// Middleware untuk memverifikasi apakah token valid (Login Check)
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Akses ditolak" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "rahasia-admin-akk");
    req.user = decoded; // Data user (termasuk role) disimpan di sini
    next();
  } catch (error) {
    res.status(403).json({ message: "Sesi kadaluwarsa" });
  }
};


// hanya ingin 'admin'
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Anda tidak punya izin untuk akses halaman ini!" 
      });
    }
    next();
  };
>>>>>>> master
};