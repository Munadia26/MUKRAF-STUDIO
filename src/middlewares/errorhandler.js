<<<<<<< HEAD


export const errorhandler = (err, req, res, next) => {
    console.error("--- ERROR LOG ---");
    console.error(err.stack); // Menampilkan detail error di terminal untuk kamu baca
    console.error("-----------------");

    // Jika error memiliki status code custom, gunakan itu. Jika tidak, pakai 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        status: "error",
        message: err.message || "Terjadi kesalahan pada server",
        // Stack trace hanya ditampilkan saat kita masih tahap coding (development)
        stack: process.env.NODE_ENV === "development" ? err.stack : {}
    });
=======


export const errorhandler = (err, req, res, next) => {
    console.error("--- ERROR LOG ---");
    console.error(err.stack); // Menampilkan detail error di terminal untuk kamu baca
    console.error("-----------------");

    // Jika error memiliki status code custom, gunakan itu. Jika tidak, pakai 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        status: "error",
        message: err.message || "Terjadi kesalahan pada server",
        // Stack trace hanya ditampilkan saat kita masih tahap coding (development)
        stack: process.env.NODE_ENV === "development" ? err.stack : {}
    });
>>>>>>> master
};