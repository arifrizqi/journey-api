const HELPERS = require('../helpers/users-helper');
const multer = require('../middlewares/multer');
const uploadToGCS = require('../utils/uploadToGCS');

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
  try {
    const { id } = req.params;
    const { full_name, email, age, gender, address, disability, phone_number, password } = req.body;

    multer.single('profile_photo_url')(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      let profile_photo_url = req.body.profile_photo_url;

      if (req.file) {
        const imageUrl = await uploadToGCS(req.file);
        profile_photo_url = imageUrl;
      }

      const userData = await HELPERS.updateUser(
        id,
        full_name,
        email,
        age,
        gender,
        address,
        disability,
        password,
        phone_number,
        profile_photo_url
      );

      if (userData.status === 'Success') {
        res.send({ status: 'Success' });
      } else {
        res.status(404).send({ status: 'Error', message: 'User not found!' });
      }
    });
  } catch (error) {
    res.status(500).send({ status: 'Error', message: error.message });
  }
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
};