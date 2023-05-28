const express = require('express');
const imgUpload = require('../utils/uploadToGCS');
const multer = require('../middlewares/multer');
const router = express.Router();

const companiesController = require('../controllers/companies-controller');

router.get('/', companiesController.getAllCompanies);
router.get('/:id',companiesController.getCompanyById);
router.post('/', multer.single('logo'), imgUpload.uploadToGcs, companiesController.addCompany);
router.put('/:id', multer.single('logo'), imgUpload.uploadToGcs, companiesController.updateCompany);
router.delete('/:id', companiesController.deleteCompany);

module.exports = router;