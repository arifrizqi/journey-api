const express = require('express');
const imgUpload = require('../utils/uploadToGCS');
const multer = require('../middlewares/multer');
const router = express.Router();

const usersController = require('../controllers/users-contoller');

router.post('/login', usersController.login);

router.get('/', usersController.authorize, usersController.getAllUsers);
router.get('/applicants/:id', usersController.authorize, usersController.applicants);
router.get('/:id', usersController.authorize, usersController.getUserById);
router.post('/', multer.single('profile_photo_url'), imgUpload.uploadToGcs, usersController.addUser);
router.put('/:id', usersController.authorize, usersController.updateUser);
router.delete('/:id', usersController.authorize, usersController.deleteUser);
// router.post('/:userId/apply/:vacancyId', usersController.authorize, usersController.applyJob);
router.post('/:userId/vacancies/:vacancyId/apply', usersController.authorize, usersController.applyJob);



module.exports = router;