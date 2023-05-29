const userController = require('../controllers/userController.js')
const disabilitieController = require('../controllers/disabilitieController.js')
const router = require('express').Router()


router.post('/addDisabilitie', disabilitieController.addDisabilitie);


router.get('/allDisabilitie', disabilitieController.getAllDisabilities);


module.exports = router;