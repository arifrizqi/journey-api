
const userController = require('../controllers/userController.js')
const disabilitieController = require('../controllers/disabilitieController.js')


const router = require('express').Router()




router.post('/addUser', userController.addUser)


router.put('/updateUser/:id', userController.updateUser)


router.get('/allUsers', userController.getAllUsers);




// user router
router.get('/:id', userController.getOneUser)



router.delete('/:id', userController.deleteUser)

module.exports = router;