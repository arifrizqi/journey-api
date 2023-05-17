const express = require('express');
const { addUser, getUserById, getUsers, updateUser, deleteUser } = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);

router.post('/', addUser);

router.get('/:id', getUserById);

router.delete('/:id', deleteUser);

router.put('/:id', updateUser);

module.exports = router;