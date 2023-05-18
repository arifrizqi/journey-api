const express = require('express');
const { 
    addCompany,
    getAllCompanys,
    getCompanyById,
    deleteCompany,
    updateCompany
} = require('../controllers/companys-controller');

const router = express.Router();

router.get('/', getAllCompanys);
router.post('/', addCompany);
router.get('/:id', getCompanyById);
router.delete('/:id', deleteCompany);
router.put('/:id', updateCompany);

module.exports = router;