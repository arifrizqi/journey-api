

// import controllers review, products
const userController = require('../controllers/userController.js')
const disabilitieController = require('../controllers/disabilitieController.js')


// router
const router = require('express').Router()


// use routers
// Dalam file userRouter.js

// Definisikan rute HTTP POST dengan fungsi callback
// router.post('/addUser', (req, res) => {
//     userController.addUser
//     res.send('User added successfully');

// });

router.post('/addUser', userController.addUser)


router.put('/updateUser', userController.updateUser)

// router.get('/allUsers', (req, res) => {
//     userController.getAllUsers
//     res.send('Gett All User successfully');

// });
// router.get('/allUsers', userController.getAllusers);
router.get('/allUsers', userController.getAllUsers);




// Products router
router.get('/:id', userController.getOneUser)

router.put('/:id', userController.updateUser)

router.delete('/:id', userController.deleteUser)

module.exports = router;