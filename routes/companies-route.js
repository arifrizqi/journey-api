const express = require('express');
const imgUpload = require('../utils/uploadToGCS');
const multer = require('../middlewares/multer');
const router = express.Router();

const companiesController = require('../controllers/companies-controller');

router.post('/login', companiesController.login);

router.get('/', companiesController.authorize, companiesController.getAllCompanies);
router.get('/:id', companiesController.authorize, companiesController.getCompanyById);
router.get('/:companyId/vacancies', companiesController.authorize, companiesController.getAllVacancies);
router.get('/:companyId/vacancies/:vacancyId', companiesController.authorize, companiesController.getVacancyById);
router.get('/:companyId/vacancies/:vacancyId/applicants', companiesController.authorize, companiesController.applicants);

router.post('/', multer.single('logo'), imgUpload.uploadToGcs, companiesController.addCompany);
router.post('/:companyId/vacancies', multer.single('logo'), imgUpload.uploadToGcs, companiesController.addVacancy);

router.put('/:id', multer.single('logo'), imgUpload.uploadToGcs, companiesController.updateCompany);
router.put('/:companyId/vacancies/:vacancyId', multer.single('logo'), imgUpload.uploadToGcs, companiesController.updateVacancyByCompany);

router.delete('/:id', companiesController.authorize, companiesController.deleteCompany);
router.delete('/:companyId/vacancies/:vacancyId', companiesController.authorize, companiesController.deleteVacancyByCompany);



module.exports = router;