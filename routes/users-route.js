const express = require('express');
const imgUpload = require('../utils/uploadToGCS');
const multer = require('../middlewares/multer');
const router = express.Router();

const usersController = require('../controllers/users-contoller');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', multer.single('profile_photo_url'), imgUpload.uploadToGcs, usersController.addUser);
router.put('/:id', multer.single('profile_photo_url'), imgUpload.uploadToGcs, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;