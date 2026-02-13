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
};