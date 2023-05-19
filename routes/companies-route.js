const express = require('express');
const { 
    addCompany,
    getAllCompanies,
    getCompanyById,
    deleteCompany,
    updateCompany
} = require('../controllers/companies-controller');

const router = express.Router();

router.get('/', getAllCompanies);
router.post('/', addCompany);
router.get('/:id', getCompanyById);
router.delete('/:id', deleteCompany);
router.put('/:id', updateCompany);

module.exports = router;