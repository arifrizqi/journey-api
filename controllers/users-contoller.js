const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        const id = uuidv4().substring(0, 8);
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
        const id = uuidv4().substring(0, 8);

        // Retrieve the id_company from the vacancies table
        const getCompanyIdQuery = 'SELECT id_company FROM vacancies WHERE id = ?';
        const getCompanyIdValues = [vacancyId];

        try {
            const companyIdResult = await query(getCompanyIdQuery, getCompanyIdValues);

            if (companyIdResult.length === 0) {
                res.status(404).json({ error: 'Vacancy not found' });
                return;
            }

            const companyId = companyIdResult[0].id_company;

            // Insert the job application with the correct id_company
            const applyJobQuery = 'INSERT INTO job_apply (id, id_vacancy, id_user, id_company, status) VALUES (?, ?, ?, ?, "pending")';
            const values = [id, vacancyId, userId, companyId];

            await query(applyJobQuery, values);

            res.json({ message: 'Job application successful' });
        } catch (error) {
            console.error('Error applying for a job:', error);
            res.status(500).json({ error: 'An error occurred while applying for a job' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        // Check if user exists
        const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
        const checkEmailValues = [email];

        try {
            const result = await query(checkEmailQuery, checkEmailValues);

            if (result.length === 0) {
                res.status(401).json({ status: 'Error', message: 'Invalid email or password' });
            } else {
                const user = result[0];

                // Compare passwords
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    res.status(401).json({ status: 'Error', message: 'Invalid email or password' });
                } else {
                    // Generate JWT token
                    const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key');

                    const checkTokenQuery = `SELECT * FROM user_tokens WHERE id_user = ?`;
                    const checkTokenValues = [user.id];

                    const existingTokenResult = await query(checkTokenQuery, checkTokenValues);

                    if (existingTokenResult.length > 0) {
                        // Token already exists, update the existing token
                        const updateTokenQuery = `UPDATE user_tokens SET tokens = ? WHERE id_user = ?`;
                        const updateTokenValues = [token, user.id];

                        await query(updateTokenQuery, updateTokenValues);
                    } else {
                        // Token doesn't exist, create a new token
                        const insertTokenQuery = `INSERT INTO user_tokens (id_user, tokens) VALUES (?, ?)`;
                        const insertTokenValues = [user.id, token];

                        await query(insertTokenQuery, insertTokenValues);
                    }

                    // Set the userId in the request object
                    req.userId = user.id;

                    // Add user ID to the response
                    res.json({ status: 'Success', id_user: user.id, roleId: 1, token });
                }


            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'Error', message: 'An error occurred during login' });
        }
    },

    authorize: (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({ status: 'Error', message: 'Token not provided' });
            return;
        }

        // Query the database to retrieve the user associated with the token
        db.query('SELECT id_user FROM user_tokens WHERE tokens = ?', [token], (err, results) => {
            if (err || results.length === 0) {
                res.status(401).json({ status: 'Error', message: 'Invalid token' });
            } else {
                const userId = results[0].id_user;

                // Add the userId to the request object
                req.userId = userId;

                next();
            }
        });
    },

    // applicants: async (req, res) => {
    //     try {
    //         const {
    //             page = 1,
    //             limit = 10
    //         } = req.query;
    //         const startIndex = (page - 1) * limit;

    //         const countSql = 'SELECT COUNT(*) as total FROM users';
    //         const countResult = await query(countSql);
    //         const totalJobApply = countResult[0].total;

    //         const sql = `
    //         SELECT 
    //           users.id, users.full_name, users.email, users.address, users.profile_photo_url, users.gender, users.age, users.phone_number, 
    //           job_apply.created_at AS applied_at, job_apply.status, 
    //           disability.name AS disability_name, skills_one.name AS skill_one_name, skills_two.name AS skill_two_name,
    //           companies.name AS company_name, vacancies.placement_address AS vacancy_placement_address
    //         FROM users 
    //         INNER JOIN job_apply ON users.id = job_apply.id_user 
    //         INNER JOIN vacancies ON job_apply.id_vacancy = vacancies.id
    //         INNER JOIN companies ON vacancies.id_company = companies.id
    //         LEFT JOIN disability ON users.id_disability = disability.id
    //         LEFT JOIN skils AS skills_one ON users.skill_one = skills_one.id
    //         LEFT JOIN skils AS skills_two ON users.skill_two = skills_two.id
    //         ORDER BY job_apply.created_at DESC
    //         LIMIT ?, ?
    //       `;

    //         const values = [startIndex, parseInt(limit)];

    //         const result = await query(sql, values);

    //         const data = result.map((applicant) => {
    //             let statusName = 'Pending';

    //             if (applicant.status === 'accepted') {
    //                 statusName = 'Accepted';
    //             } else if (applicant.status === 'rejected') {
    //                 statusName = 'Rejected';
    //             }

    //             return { ...applicant, status: statusName };
    //         });

    //         const totalPages = Math.ceil(totalJobApply / limit);

    //         res.json({
    //             status: 'Success',
    //             page: parseInt(page),
    //             limit: parseInt(limit),
    //             totalJobApply,
    //             totalPages,
    //             data
    //         });
    //     } catch (error) {
    //         console.error('Failed to get a list of applicants:', error);
    //         res.status(500).json({ error: 'Failed to get a list of applicants' });
    //     }
    // },

    applicants: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const id_user = req.params.id_user;
            const startIndex = (page - 1) * limit;

            let countSql = 'SELECT COUNT(*) as total FROM users';
            let sql = `
            SELECT 
              users.id, users.full_name, users.email, users.address, users.profile_photo_url, users.gender, users.age, users.phone_number, 
              job_apply.created_at AS applied_at, job_apply.status, 
              disability.name AS disability_name, skills_one.name AS skill_one_name, skills_two.name AS skill_two_name,
              companies.name AS company_name, vacancies.placement_address AS vacancy_placement_address
            FROM users 
            INNER JOIN job_apply ON users.id = job_apply.id_user 
            INNER JOIN vacancies ON job_apply.id_vacancy = vacancies.id
            INNER JOIN companies ON vacancies.id_company = companies.id
            LEFT JOIN disability ON users.id_disability = disability.id
            LEFT JOIN skils AS skills_one ON users.skill_one = skills_one.id
            LEFT JOIN skils AS skills_two ON users.skill_two = skills_two.id
            WHERE job_apply.id_user = ?
          `;

            const countResult = await query(countSql);
            const totalJobApply = countResult[0].total;

            sql += ' ORDER BY job_apply.created_at DESC LIMIT ?, ?';
            const values = [id_user, startIndex, parseInt(limit)];

            const result = await query(sql, values);

            const data = result.map((applicant) => {
                let statusName = 'Pending';

                if (applicant.status === 'accepted') {
                    statusName = 'Accepted';
                } else if (applicant.status === 'rejected') {
                    statusName = 'Rejected';
                }

                return { ...applicant, status: statusName };
            });

            const totalPages = Math.ceil(totalJobApply / limit);

            res.json({
                status: 'Success',
                page: parseInt(page),
                limit: parseInt(limit),
                totalJobApply,
                totalPages,
                data
            });
        } catch (error) {
            console.error('Failed to get a list of applicants:', error);
            res.status(500).json({ error: 'Failed to get a list of applicants' });
        }
    }






}

module.exports = usersController;