const express = require('express');
const router = express.Router();

const vacanciesController = require('../controllers/vacancies-controller');

router.get('/', vacanciesController.getAllVacancies);
router.get('/:id', vacanciesController.getVacancyById);
router.put('/:id', vacanciesController.updateVacancy);
router.delete('/:id', vacanciesController.deleteVacancy);

module.exports = router;