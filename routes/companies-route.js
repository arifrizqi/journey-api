const multer = require('multer');
const express = require('express');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const companiesController = require('../controllers/companies-controller');

router.get('/', );
router.get('/:id',);
router.post('/', upload.single('logo'), companiesController.addCompany);
router.put('/:id', );
router.delete('/:id', );

module.exports = router;