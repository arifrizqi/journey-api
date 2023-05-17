const MODELS = require('../models/userModels');

const getUsers = async (req, res) => {
    let getUser = await MODELS.getAllUsers();
    res.status(200).send(getUser);
}

const addUser = async (req, res) => {
    let user = req.body;
    let data = await MODELS.addUser(user);
    res.status(201).send(data);
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    const userData = await MODELS.getUserById(id);
    res.status(200).send(userData);
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const userData = await MODELS.deleteUser(id);

    res.status(200).send(userData);
}

const updateUser = async (req, res) => {

    const { id } = req.params;
    const { full_name, email, age, gender, address, disability } = req.body;

    const userData = await MODELS.updateUser(id, full_name, email, age, gender, address, disability);

    res.status(200).send(userData);
}

module.exports = { getUsers, getUserById, addUser, deleteUser, updateUser }