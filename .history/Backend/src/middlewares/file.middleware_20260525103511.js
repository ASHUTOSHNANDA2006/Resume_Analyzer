const multer = require("multer")


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fil
    }
})