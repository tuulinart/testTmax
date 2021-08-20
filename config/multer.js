const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
    dest: path.resolve(__dirname, "..", "src", "uploads"),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "src", "uploads"),)
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash)=> {
                if (err) cb(err);

                const fileName = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, fileName)

            });
        }
    }),
    limits: {
        fileSize: 10 * 1024 *1024,
    },
    fileFilter: (req, file, cb) => {
        const allowed = [
            "image/jpeg" ,
            "image/pjpeg",
            "image/png",
        ];

        if(allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo de arquivo não suportado."))
        }
    }
};