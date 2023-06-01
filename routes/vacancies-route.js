const express = require('express');
const router = express.Router();

const vacanciesController = require('../controllers/vacancies-controller');

router.get('/', vacanciesController.getAllVacancies);
router.get('/popular', vacanciesController.popular);
router.get('/latest', vacanciesController.latest);
router.get('/:id', vacanciesController.getVacancyById);

module.exports = router;