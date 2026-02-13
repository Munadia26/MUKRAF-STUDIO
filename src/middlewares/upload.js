import multer from "multer";
import path from "path";

//FUNGSI UNTUK MENENTUKAN DIMANA FILE GAMBAR AKAN TERSIMPAN SETELAH DI UPLOAD
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); //FOLDER UPLOAD
    },

    filename: (req, file, cb) => {
        //MEMBERI NAMA UNIK KE GAMBAR YG SUDAH DIUPLOAD SUPAYA TIDAK BENTROK + FORMAT FOTO ASLI
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

//FUNGSI UNTUK MEMFILTER FILE YG DITERIMA BERUPA GAMBAR
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isExtValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const isMimeValid = allowedTypes.test(file.mimetype);


    if (isExtValid && isMimeValid){
        cb(null, true);
    }else{
        //FUNGSI JIKA GAMBAR YG DI UPLOAD TIDAK SESUAI DENGAN FORMAT
        cb(new Error("Format file tidak didukung! Gunakan jpg/png/webp"), false);
    }
};

//upload merupakan variabel yg digunakan di route
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024} //Batas maksimal 2MB
});