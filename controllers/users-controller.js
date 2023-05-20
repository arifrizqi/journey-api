const multer = require('../middlewares/multer');
const uploadToGCS = require('../utils/uploadToGCS');
const HELPERS = require('../helpers/users-helper');

const getUsers = async (req, res) => {
    let getUser = await HELPERS.getAllUsers();
    res.send(getUser);
}

const addUser = async (req, res) => {
    // handle file upload
    multer.single('profile_photo_url')(req, res, async function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        let user = req.body;

        // upload file to Google Cloud Storage
        if (req.file) {
            const imageUrl = await uploadToGCS(req.file);
            user.profile_photo_url = imageUrl;
        }

        let data = await HELPERS.addUser(user);
        res.send(data);
    });
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