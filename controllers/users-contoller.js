const db = require('../database/db');
const bcrypt = require('bcrypt');
const {
    v4: uuidv4
} = require('uuid');

function query(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

const usersController = {
    addUser: async (req, res) => {
        const {
            full_name,
            email,
            password,
            skill_one,
            skill_two,
            id_disability,
            address,
            gender,
            age,
            phone_number
        } = req.body;
        const id = uuidv4();
        const roleId = 1;
        const profile_photo_url = 'https://storage.googleapis.com/journey-bangkit/profile.png';

        const hash = bcrypt.hashSync(password, 10);

        // Periksa keberadaan email sebelum menambahkan pengguna
        const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
        const checkEmailValues = [email];

        db.query(checkEmailQuery, checkEmailValues, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    status: 'Error',
                    message: err.sqlMessage
                });
            } else {
                if (result.length > 0) {
                    res.status(400).json({
                        status: 'Error',
                        message: 'The email already exists'
                    });
                } else {
                    const sql = `INSERT INTO users (id, full_name, email, password, skill_one, skill_two, id_disability, address, profile_photo_url, gender, age, phone_number, created_at, roleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)`;

                    const values = [id, full_name, email, hash, skill_one, skill_two, id_disability, address, profile_photo_url, gender, age, phone_number, roleId];

                    db.query(sql, values, (err, result) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({
                                status: 'Error',
                                message: err.sqlMessage
                            });
                        } else {
                            res.json({
                                status: 'Success',
                                message: 'User added successfully',
                                id
                            });
                        }
                    });
                }
            }
        });
    },


    getAllUsers: async (req, res) => {
        try {
            const {
                page = 1, limit = 10
            } = req.query;
            const startIndex = (page - 1) * limit;

            const countSql = 'SELECT COUNT(*) as total FROM users';
            const countResult = await query(countSql);
            const totalUsers = countResult[0].total;

            const sql = `SELECT users.id, users.full_name, users.email, users.address, users.profile_photo_url, users.gender, users.age, users.phone_number, users.created_at, disability.name AS disability_name, skills_one.name AS skill_one_name, skills_two.name AS skill_two_name
            FROM users
            LEFT JOIN disability ON users.id_disability = disability.id
            LEFT JOIN skils AS skills_one ON users.skill_one = skills_one.id
            LEFT JOIN skils AS skills_two ON users.skill_two = skills_two.id
                 LIMIT ?, ?`;
            const values = [startIndex, parseInt(limit)];

            const result = await query(sql, values);

            const users = result.map((user) => {
                const tempData = {
                    ...user
                };
                return tempData;
            });

            const totalPages = Math.ceil(totalUsers / limit);

            res.json({
                status: 'Success',
                page: parseInt(page),
                limit: parseInt(limit),
                totalUsers,
                totalPages,
                users
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'Error',
                message: 'An error occurred loading the user'
            });
        }
    },

    getUserById: async (req, res) => {
        const {
            id
        } = req.params;

        const sql = `
        SELECT users.id, users.full_name, users.email, users.address, users.profile_photo_url, users.gender, users.age, users.phone_number, users.created_at, disability.name AS disability_name, skils_one.name AS skill_one_name, skils_two.name AS skill_two_name
        FROM users
        JOIN disability ON users.id_disability = disability.id
        JOIN skils AS skils_one ON users.skill_one = skils_one.id
        JOIN skils AS skils_two ON users.skill_two = skils_two.id
        WHERE users.id = ?
      `;
        const values = [id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    status: 'Error',
                    message: 'An error occurred loading the user'
                });
            } else {
                if (result.length === 0) {
                    res.status(404).json({
                        status: 'Error',
                        message: 'User not found'
                    });
                } else {
                    const user = result[0];

                    res.json({
                        status: 'Success',
                        user
                    });
                }
            }
        });
    },


    updateUser: async (req, res) => {
        const userId = req.params.id;
        const {
            full_name,
            email,
            password,
            id_disability,
            address,
            gender,
            age,
            phone_number,
            skill_one,
            skill_two
        } = req.body;

        // Periksa apakah ada file gambar yang diunggah
        let profile_photo_url = '';
        if (req.file && req.file.cloudStoragePublicUrl) {
            // Validasi tipe file apakah gambar atau bukan
            if (!req.file.mimetype.startsWith('image/')) {
            return res.status(400).json({
                error: 'Only image files are allowed'
            });
            }
            profile_photo_url = req.file.cloudStoragePublicUrl;
        }

        // Cek apakah password berubah
        let hash = null;
        if (password) {
            hash = bcrypt.hashSync(password, 10);
        }

        const query = `UPDATE users SET 
        full_name = COALESCE(?, full_name), 
        email = COALESCE(?, email), 
        password = COALESCE(?, password), 
        skill_two = COALESCE(?, skill_two),
        skill_one = COALESCE(?, skill_one),
        id_disability = COALESCE(?, id_disability), 
        profile_photo_url = COALESCE(?, profile_photo_url), 
        address = COALESCE(?, address), 
        gender = COALESCE(?, gender), 
        age = COALESCE(?, age), 
        phone_number = COALESCE(?, phone_number) 
        WHERE id = ?`;

        const values = [
            full_name,
            email,
            password,
            skill_one,
            skill_two,
            id_disability,
            profile_photo_url || null,
            address,
            gender,
            age,
            phone_number,
            userId
        ];

        db.query(query, values, (err, rows, fields) => {
            if (err) {
                res.status(500).send({
                    message: err.sqlMessage
                });
            } else {
                res.send({
                    message: "Update Successful"
                });
            }
        });
    },

    deleteUser: async (req, res) => {
        try {
            const {
                id
            } = req.params;

            const sql = `DELETE FROM users WHERE id = ?`;
            const values = [id];

            await query(sql, values);

            res.json({
                status: 'Success',
                message: 'User successfully deleted'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'Error',
                message: 'An error occurred deleting the user'
            });
        }
    },

    applyJob: async (req, res) => {
        const userId = req.params.userId;
        const vacancyId = req.params.vacancyId;
        const id = uuidv4();

        // Periksa keberadaan lamaran pekerjaan sebelum menambahkan
        const checkApplyQuery = `SELECT * FROM job_apply WHERE id_user = ? AND id_vacancy = ?`;
        const checkApplyValues = [userId, vacancyId];

        db.query(checkApplyQuery, checkApplyValues, (error, results) => {
            if (error) {
                console.error('Error checking job application:', error);
                res.status(500).json({
                    error: 'An error occurred while checking job application'
                });
            } else {
                if (results.length > 0) {
                    res.status(400).json({
                        error: 'User has already applied for this job'
                    });
                } else {
                    const applyJobQuery = `INSERT INTO job_apply (id, id_vacancy, id_user) VALUES (?, ?, ?)`;
                    const values = [id, vacancyId, userId];

                    db.query(applyJobQuery, values, (error, results) => {
                        if (error) {
                            console.error('Error applying for a job:', error);
                            res.status(500).json({
                                error: 'An error occurred while applying for a job'
                            });
                        } else {
                            res.json({
                                message: 'Job application successful'
                            });
                        }
                    });
                }
            }
        });
    },
}

module.exports = usersController;