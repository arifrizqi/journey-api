const db = require('../models')
const validator = require('fastest-validator');

const v = new validator();

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const User = db.users
const Disabilities = db.disabilities

// 1. create product

const addUser = async (req, res) => {

    const schema = {
        fullName: 'string',
        email: 'string',
        password: 'string',
        gender: 'string',
        phoneNumber: 'number',
        age: 'number',
        profilePhotoUrl: 'string',
        roleId: { type: 'number', optional: true },

    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate);
    }

    const user = await User.create(req.body);
    res.json(user)



}



// 2. get all products

const getAllUsers = async (req, res) => {

    let users = await User.findAll({})
    res.status(200).send(users)

}

// 3. get single product

const getOneUser = async (req, res) => {

    let id = req.params.id
    let user = await User.findOne({ where: { id: id } })
    res.status(200).send(user)

}

// 4. update Product

const updateUser = async (req, res) => {

    let id = req.params.id

    const user = await User.update(req.body, { where: { id: id } })

    res.status(200).send(user)


}

// 5. delete product by id

const deleteUser = async (req, res) => {

    let id = req.params.id

    await User.destroy({ where: { id: id } })

    res.status(200).send('User is deleted !')

}

// 6. get published product

// const getPublishedUser = async (req, res) => {

//     const users = await User.findAll({ where: { published: true } })

//     res.status(200).send(users)

// }

// 7. connect one to many relation Product and Reviews

// const getDisabilityName = async (req, res) => {

//     const id = req.params.id

//     const data = await User.findOne({
//         include: [{
//             model: Disabilities,
//             as: 'Disabilities'
//         }],
//         where: { id: id }
//     })

//     res.status(200).send(data)

// }


// 8. Upload Image Controller

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: '1000000' },
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png|gif/
//         const mimeType = fileTypes.test(file.mimetype)
//         const extname = fileTypes.test(path.extname(file.originalname))

//         if (mimeType && extname) {
//             return cb(null, true)
//         }
//         cb('Give proper files formate to upload')
//     }
// }).single('image')











module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}