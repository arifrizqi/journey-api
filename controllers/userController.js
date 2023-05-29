const db = require('../models')
const validator = require('fastest-validator');

const v = new validator();

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const User = db.users
const Disabilities = db.disabilities

// 

const addUser = async (req, res) => {

    const schema = {
        fullName: 'string',
        email: 'string',
        password: 'string',
        gender: 'string',
        phoneNumber: 'number',
        age: 'number',
        profilePhotoUrl: { type: 'number', optional: true },
        roleId: { type: 'number', optional: true },

    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate);
    }

    const user = await User.create(req.body);
    res.json(user)

}


const getAllUsers = async (req, res) => {

    let users = await User.findAll({})
    res.status(200).send(users)

}

const getOneUser = async (req, res) => {

    let id = req.params.id
    let user = await User.findOne({ where: { id: id } })
    res.status(200).send(user)

}

const updateUser = async (req, res) => {

    let id = req.params.id

    // const user = await User.update(req.body, { where: { id: id } })

    res.status(200).send(id)


}

const deleteUser = async (req, res) => {

    let id = req.params.id

    await User.destroy({ where: { id: id } })

    res.status(200).send('User is deleted !')

}


module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}