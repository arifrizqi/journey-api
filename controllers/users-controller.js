const HELPERS = require('../helpers/users-helper');

const getUsers = async (req, res) => {
    let getUser = await HELPERS.getAllUsers();
    res.send(getUser);
}

const addUser = async (req, res) => {
    let user = req.body;
    let data = await HELPERS.addUser(user);
    res.send(data);
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    const userData = await HELPERS.getUserById(id);
    res.send(userData);
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const userData = await HELPERS.deleteUser(id);
    res.send(userData);
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { full_name, email, age, gender, address, disability, password } = req.body;
    const userData = await HELPERS.updateUser(id, full_name, email, age, gender, address, disability, password);
    res.send(userData);
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
};