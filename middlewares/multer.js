const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 2 * 1024 * 1024, // Maximum file size is 2MB
    },
});

module.exports = multer;
