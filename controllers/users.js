const { v4: uuidv4 } = require('uuid');
let users = [];
const getUsers = (req, res) => {
    res.send(users);
}

const addUser = (req, res) => {
    const user = req.body;

    const userId = uuidv4();;

    const userWithId = { id: userId, ...user }
    users.push(userWithId);

    res.send('successfuly add user');
}

const getUserById = (req, res) => {
    const { id } = req.params;

    const findUser = users.find((user) => user.id === id);

    res.send(findUser);
}

const deleteUser = (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`user has been deleted`);
}

const updateUser = (req, res) => {
    const { id } = req.params;

    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id === id);

    if(firstName){
        user.firstName = firstName;
    }

    if(lastName){
        user.lastName = lastName;
    }

    if(age){
        user.age = age;
    }

    res.send(`user has been updated`);
}

module.exports = { getUsers, getUserById, addUser, deleteUser, updateUser }