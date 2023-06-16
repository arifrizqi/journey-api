const db = require('../database/db');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
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

const companiesController = {
    addCompany: async (req, res) => {
        const id = uuidv4().substring(0, 8);
        const name = req.body.name;
        const address = req.body.address;
        const city = req.body.city;
        const province = req.body.province;
        var logo = 'https://storage.googleapis.com/journey-bangkit/company.png';
        const employees = req.body.employees;
        const id_sector = req.body.id_sector;
        const email = req.body.email;
        const password = req.body.password;
        const roleId = 2;

        const hash = bcrypt.hashSync(password, 10);

        const checkEmailExists = async (email) => {
            return new Promise((resolve, reject) => {
                const query = "SELECT * FROM companies WHERE email = ?";
                db.query(query, [email], (err, rows, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows.length > 0);
                    }
                });
            });
        };

        const emailExists = await checkEmailExists(email);

        if (emailExists) {
            res.status(400).send({
                message: "Email already exists"
            });
            return;
        }

        const query =
            "INSERT INTO companies (id, name, address, city, province, logo, employees, id_sector, email, password, roleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        db.query(
            query,
            [
                id,
                name,
                address,
                city,
                province,
                logo,
                employees,
                id_sector,
                email,
                hash,
                roleId,
            ],
            (err, rows, fields) => {
                if (err) {
                    res.status(500).send({
                        message: err.sqlMessage
                    });
                } else {
                    res.send({
                        message: "Company added successfully"
                    });
                }
            }
        );
    },

    updateCompany: async (req, res) => {
        const companyId = req.params.id; // Mengambil ID perusahaan dari parameter permintaan
        const {
            name,
            address,
            city,
            province,
            employees,
            id_sector,
            email,
            password
        } = req.body;

        // Periksa apakah ada file gambar yang diunggah
        let logo = '';
        if (req.file && req.file.cloudStoragePublicUrl) {
            // Validasi tipe file apakah gambar atau bukan
            if (!req.file.mimetype.startsWith('image/')) {
                return res.status(400).json({
                    error: 'Only image files are allowed'
                });
            }
            logo = req.file.cloudStoragePublicUrl;
        }

        // Cek apakah password berubah
        let hash = null;
        if (password) {
            hash = bcrypt.hashSync(password, 10);
        }

        const query = `UPDATE companies SET 
      name = COALESCE(?, name), 
      address = COALESCE(?, address), 
      city = COALESCE(?, city), 
      province = COALESCE(?, province), 
      logo = COALESCE(?, logo),  
      employees = COALESCE(?, employees), 
      id_sector = COALESCE(?, id_sector), 
      email = COALESCE(?, email), 
      password = COALESCE(?, password)
      WHERE id = ?`;

        const values = [
            name,
            address,
            city,
            province,
            logo || null,
            employees,
            id_sector,
            email,
            hash,
            companyId
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

    getAllCompanies: async (req, res) => {
        try {
            const {
                page = 1, limit = 10
            } = req.query;
            const startIndex = (page - 1) * limit;

            const countSql = 'SELECT COUNT(*) as total FROM companies';
            const countResult = await query(countSql);
            const totalCompanies = countResult[0].total;

            const sql = `
        SELECT companies.id, companies.name, companies.address, companies.city, companies.province, companies.logo, companies.employees, companies.email, companies.roleId, company_sector.name AS sector_name
        FROM companies
        INNER JOIN company_sector ON companies.id_sector = company_sector.id
        LIMIT ?, ?
      `;
            const values = [startIndex, parseInt(limit)];

            const result = await query(sql, values);

            const companies = result.map((company) => {
                const tempData = {
                    ...company
                };
                tempData.id = company.id;
                return tempData;
            });

            const totalPages = Math.ceil(totalCompanies / limit);

            res.json({
                status: 'Success',
                page: parseInt(page),
                limit: parseInt(limit),
                totalCompanies,
                totalPages,
                companies
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'Error',
                message: 'An error occurred loading company'
            });
        }
    },

    getCompanyById: async (req, res) => {
        const {
            id
        } = req.params;

        const sql = `SELECT companies.id, companies.name, companies.address, companies.city, companies.province, companies.logo, companies.employees, companies.email, companies.roleId, company_sector.name AS sector_name
    FROM companies
    INNER JOIN company_sector ON companies.id_sector = company_sector.id WHERE companies.id = ?`;
        const values = [id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    status: 'Error',
                    message: 'An error occurred loading company'
                });
            } else {
                if (result.length === 0) {
                    res.status(404).json({
                        status: 'Error',
                        message: 'Company not found'
                    });
                } else {
                    const company = result[0];
                    res.json({
                        status: 'Success',
                        company
                    });
                }
            }
        });
    },

    deleteCompany: async (req, res) => {
        try {
            const {
                id
            } = req.params;

            const sql = `DELETE FROM companies WHERE id = ?`;
            const values = [id];

            await query(sql, values);

            res.json({
                status: 'Success',
                message: 'Company successfully deleted'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'Error',
                message: 'Error deleting Company'
            });
        }
    },

    addVacancy: async (req, res) => {
        const companyId = req.params.companyId;
        const {
            placement_address,
            description,
            id_disability,
            skill_one,
            skill_two,
            deadline_time,
            job_type,
        } = req.body;

        const vacancy = {
            id: uuidv4().substring(0, 8),
            placement_address,
            description,
            id_disability,
            skill_one,
            skill_two,
            deadline_time,
            job_type,
            id_company: companyId,
        };

        db.query('INSERT INTO vacancies SET ?', vacancy, (err, result) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal server error'
                });
            } else {
                res.status(201).json({
                    message: 'Vacancy created successfully'
                });
            }
        });
    },

    getAllVacancies: async (req, res) => {
        const { companyId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
      
        try {
          const countQuery = 'SELECT COUNT(*) as totalCount FROM vacancies WHERE id_company = ?';
          const vacanciesByCompanyQuery = `
            SELECT 
              vacancies.id, vacancies.placement_address, vacancies.description, vacancies.created_at, vacancies.updated_at, vacancies.deadline_time, vacancies.job_type,
              skil_one.name AS skill_one_name,
              skil_two.name AS skill_two_name,
              disability.name AS disability_name,
              companies.logo AS company_logo,
              companies.name AS company_name,
              company_sector.name AS sector_name
            FROM 
              vacancies
              INNER JOIN companies ON vacancies.id_company = companies.id
              INNER JOIN company_sector ON companies.id_sector = company_sector.id
              INNER JOIN skils AS skil_one ON vacancies.skill_one = skil_one.id
              INNER JOIN skils AS skil_two ON vacancies.skill_two = skil_two.id
              INNER JOIN disability ON vacancies.id_disability = disability.id
            WHERE 
              vacancies.id_company = ?
            LIMIT ?, ?
          `;
      
          const totalCount = await new Promise((resolve, reject) => {
            db.query(countQuery, companyId, (err, results) => {
              if (err) {
                console.error('Failed to get the total number of job vacancies:', err);
                reject('Failed to get the total number of job vacancies');
              } else {
                resolve(results[0].totalCount);
              }
            });
          });
      
          const vacancies = await new Promise((resolve, reject) => {
            db.query(vacanciesByCompanyQuery, [companyId, startIndex, limit], (err, results) => {
              if (err) {
                console.error('Failed to get job vacancies:', err);
                reject('Failed to get job vacancies');
              } else {
                resolve(results);
              }
            });
          });
      
          const response = {
            status: 'Success',
            page: parseInt(page),
            limit: parseInt(limit),
            totalVacancies: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            vacancies,
          };
      
          res.status(200).json(response);
        } catch (error) {
          console.error('An error occurred:', error);
          res.status(500).json({
            error
          });
        }
      },
      

    getVacancyById: async (req, res) => {
        const {
            companyId,
            vacancyId
        } = req.params;

        db.query(
            `SELECT 
            vacancies.id, vacancies.placement_address, vacancies.description, vacancies.created_at, vacancies.updated_at, vacancies.deadline_time, vacancies.job_type, 
            skil_one.name AS skill_one_name,
            skil_two.name AS skill_two_name,
            disability.name AS disability_name,
            companies.logo AS company_logo,
            companies.name AS company_name,
            company_sector.name AS sector_name
        FROM 
            vacancies
            
          INNER JOIN companies ON vacancies.id_company = companies.id
          INNER JOIN company_sector ON companies.id_sector = company_sector.id
        INNER JOIN 
            skils AS skil_one ON vacancies.skill_one = skil_one.id
        INNER JOIN 
            skils AS skil_two ON vacancies.skill_two = skil_two.id
        INNER JOIN 
            disability ON vacancies.id_disability = disability.id
        WHERE id_company = ? AND vacancies.id = ?`,
            [companyId, vacancyId],
            (err, results) => {
                if (err) {
                    console.error('Failed to get a job:', err);
                    res.status(500).json({
                        error: 'Failed to get a job'
                    });
                } else {
                    if (results.length === 0) {
                        res.status(404).json({
                            error: 'Job vacancies not found'
                        });
                    } else {
                        res.status(200).json(results[0]);
                    }
                }
            }
        );
    },

    updateVacancyByCompany: (req, res) => {
        const {
            companyId,
            vacancyId
        } = req.params;
        const {
            placement_address,
            description,
            id_disability,
            skill_one,
            skill_two,
            deadline_time,
            job_type
        } = req.body;

        const updatedVacancy = {};

        if (placement_address) {
            updatedVacancy.placement_address = placement_address;
        }
        if (description) {
            updatedVacancy.description = description;
        }
        if (skill_one) {
            updatedVacancy.skill_one = skill_one;
        }
        if (skill_two) {
            updatedVacancy.skill_two = skill_two;
        }
        if (id_disability) {
            updatedVacancy.id_disability = id_disability;
        }
        if (job_type) {
            updatedVacancy.job_type = job_type;
        }
        if (deadline_time) {
            updatedVacancy.deadline_time = deadline_time;
        }

        updatedVacancy.updated_at = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        db.query(
            'UPDATE vacancies SET ? WHERE id_company = ? AND id = ?',
            [updatedVacancy, companyId, vacancyId],
            (err, result) => {
                if (err) {
                    console.error('Failed to update job vacancies:', err);
                    res.status(500).json({
                        error: 'Failed to update job vacancies'
                    });
                } else {
                    if (result.affectedRows === 0) {
                        res.status(404).json({
                            error: 'Job vacancies not found'
                        });
                    } else {
                        res.status(200).json({
                            message: 'Job vacancies updated successfully'
                        });
                    }
                }
            }
        );
    },

    deleteVacancyByCompany: async (req, res) => {
        const {
            companyId,
            vacancyId
        } = req.params;

        db.query(
            'DELETE FROM vacancies WHERE id_company = ? AND id = ?',
            [companyId, vacancyId],
            (err, result) => {
                if (err) {
                    console.error('Failed to delete job posting:', err);
                    res.status(500).json({
                        error: 'Failed to delete job posting'
                    });
                } else {
                    if (result.affectedRows === 0) {
                        res.status(404).json({
                            error: 'Job vacancies not found'
                        });
                    } else {
                        res.status(200).json({
                            message: 'Job Vacancies Deleted Successfully'
                        });
                    }
                }
            }
        );
    },

    // applicants: async (req, res) => {
    //     const {
    //         companyId,
    //         vacancyId
    //     } = req.params;

    //     db.query(
    //         `SELECT users.id, users.full_name, users.email, users.address, users.profile_photo_url, users.gender, users.age, users.phone_number, job_apply.created_at AS applied_at, disability.name AS disability_name, skills_one.name AS skill_one_name, skills_two.name AS skill_two_name
    //       FROM users 
    //       INNER JOIN job_apply ON users.id = job_apply.id_user 
    //       LEFT JOIN disability ON users.id_disability = disability.id
    //       LEFT JOIN skils AS skills_one ON users.skill_one = skills_one.id
    //       LEFT JOIN skils AS skills_two ON users.skill_two = skills_two.id
    //       WHERE job_apply.id_vacancy = ?`,
    //         vacancyId,
    //         (err, results) => {
    //             if (err) {
    //                 console.error('Failed to get a list of applicants:', err);
    //                 res.status(500).json({
    //                     error: 'Failed to get a list of applicants'
    //                 });
    //             } else {
    //                 res.status(200).json(results);
    //             }
    //         }
    //     );
    // },

    applicants: async (req, res) => {
        const { companyId, vacancyId } = req.params;
      
        db.query(
          `SELECT 
            users.id, users.full_name, users.email, users.address, users.profile_photo_url, users.gender, users.age, users.phone_number, 
            job_apply.created_at AS applied_at, job_apply.status, 
            disability.name AS disability_name, skills_one.name AS skill_one_name, skills_two.name AS skill_two_name
          FROM users 
          INNER JOIN job_apply ON users.id = job_apply.id_user 
          LEFT JOIN disability ON users.id_disability = disability.id
          LEFT JOIN skils AS skills_one ON users.skill_one = skills_one.id
          LEFT JOIN skils AS skills_two ON users.skill_two = skills_two.id
          WHERE job_apply.id_vacancy = ?`,
          vacancyId,
          (err, results) => {
            if (err) {
              console.error('Failed to get a list of applicants:', err);
              res.status(500).json({ error: 'Failed to get a list of applicants' });
            } else {
              // Map the results and add a 'status_name' field based on the 'status' value
              const applicants = results.map((applicant) => {
                let statusName = 'Pending';
      
                if (applicant.status === 'accepted') {
                  statusName = 'Accepted';
                } else if (applicant.status === 'rejected') {
                  statusName = 'Rejected';
                }
      
                return { ...applicant, status: statusName };
              });
      
              res.status(200).json(applicants);
            }
          }
        );
      },
      

    login: async (req, res) => {
        const { email, password } = req.body;

        // Check if user exists
        const checkEmailQuery = `SELECT * FROM companies WHERE email = ?`;
        const checkEmailValues = [email];

        try {
            const result = await query(checkEmailQuery, checkEmailValues);

            if (result.length === 0) {
                res.status(401).json({ status: 'Error', message: 'Invalid email or password' });
            } else {
                const companie = result[0];

                // Compare passwords
                const passwordMatch = await bcrypt.compare(password, companie.password);

                if (!passwordMatch) {
                    res.status(401).json({ status: 'Error', message: 'Invalid email or password' });
                } else {
                    // Generate JWT token
                    const token = jwt.sign({ id: companie.id, email: companie.email }, 'secret_key');

                    const checkTokenQuery = `SELECT * FROM company_tokens WHERE id_company = ?`;
                    const checkTokenValues = [companie.id];

                    const existingTokenResult = await query(checkTokenQuery, checkTokenValues);

                    if (existingTokenResult.length > 0) {
                        // Token already exists, update the existing token
                        const updateTokenQuery = `UPDATE company_tokens SET tokens = ? WHERE id_company = ?`;
                        const updateTokenValues = [`Bearer ${token}`, companie.id];

                        await query(updateTokenQuery, updateTokenValues);
                    } else {
                        // Token doesn't exist, create a new token
                        const insertTokenQuery = `INSERT INTO company_tokens (id_company, tokens) VALUES (?, ?)`;
                        const insertTokenValues = [companie.id, `Bearer ${token}`];

                        await query(insertTokenQuery, insertTokenValues);
                    }

                    // Set the userId in the request object
                    req.companyId = companie.id;

                    // Add user ID to the response
                    res.json({ status: 'Success', id_company: companie.id, roleId: 2, token: `Bearer ${token}` });
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
        db.query('SELECT id_company FROM company_tokens WHERE tokens = ?', [token], (err, results) => {
            if (err || results.length === 0) {
                res.status(401).json({ status: 'Error', message: 'Invalid token' });
            } else {
                const companieId = results[0].id_company;

                // Add the userId to the request object
                req.companyId = companieId;

                next();
            }
        });
    },

    acceptApplicant: async (req, res) => {
        const { companyId, vacancyId, userId } = req.params;
    
        // Update status pelamar menjadi diterima
        const updateStatusQuery = `
          UPDATE job_apply 
          SET status = 'accepted' 
          WHERE id_company = ? AND id_vacancy = ? AND id_user = ?
        `;
        const updateStatusValues = [companyId, vacancyId, userId];
    
        try {
          await query(updateStatusQuery, updateStatusValues);
          res.status(200).json({ status: 'Success', message: 'Applicant accepted' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ status: 'Error', message: 'Failed to accept applicant' });
        }
      },
    
      rejectApplicant: async (req, res) => {
        const { companyId, vacancyId, userId } = req.params;
    
        // Update status pelamar menjadi ditolak
        const updateStatusQuery = `
          UPDATE job_apply 
          SET status = 'rejected' 
          WHERE id_company = ? AND id_vacancy = ? AND id_user = ?
        `;
        const updateStatusValues = [companyId, vacancyId, userId];
    
        try {
          await query(updateStatusQuery, updateStatusValues);
          res.status(200).json({ status: 'Success', message: 'Applicant rejected' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ status: 'Error', message: 'Failed to reject applicant' });
        }
      }


};

module.exports = companiesController;