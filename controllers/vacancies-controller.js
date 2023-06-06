const db = require('../database/db');

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

const vacanciesController = {
    getAllVacancies: async (req, res) => {
        try {
            const {
                page = 1, limit = 10
            } = req.query;
            const startIndex = (page - 1) * limit;

            const countSql = 'SELECT COUNT(*) as total FROM vacancies';
            const countResult = await query(countSql);
            const totalVacancies = countResult[0].total;

            const sql = `SELECT vacancies.id, vacancies.placement_address, vacancies.description, vacancies.created_at, vacancies.updated_at,
                       disability.name AS disability_name, vacancies.deadline_time, companies.name AS company_name, companies.logo AS company_logo
                       FROM vacancies
                       INNER JOIN disability ON vacancies.id_disability = disability.id
                       INNER JOIN companies ON vacancies.id_company = companies.id
                       LIMIT ?, ?`;

            const values = [startIndex, parseInt(limit)];

            const result = await query(sql, values);

            const vacancies = result.map((vacancy) => {
                const tempData = {
                    ...vacancy
                };
                return tempData;
            });

            const totalPages = Math.ceil(totalVacancies / limit);

            res.json({
                status: 'Success',
                page: parseInt(page),
                limit: parseInt(limit),
                totalVacancies,
                totalPages,
                vacancies
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'Error',
                message: 'An error occurred loading vacancy'
            });
        }
    },

    getVacancyById: async (req, res) => {
        const {
            id
        } = req.params;

        const sql = `SELECT vacancies.id, vacancies.placement_address, vacancies.description, vacancies.created_at, vacancies.updated_at,
        disability.name AS disability_name, vacancies.deadline_time,companies.logo AS company_logo, companies.name AS company_name
        FROM vacancies
        INNER JOIN disability ON vacancies.id_disability = disability.id
        INNER JOIN companies ON vacancies.id_company = companies.id WHERE vacancies.id = ?`;
        const values = [id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    status: 'Error',
                    message: 'An error occurred loading vacancy'
                });
            } else {
                if (result.length === 0) {
                    res.status(404).json({
                        status: 'Error',
                        message: 'vacancy not found'
                    });
                } else {
                    const vacancy = result[0];
                    res.json({
                        status: 'Success',
                        vacancy
                    });
                }
            }
        });
    },

    popular: async (req, res) => {
        const {
            page,
            perPage
        } = req.query;
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(perPage) || 10;
        const startIndex = (currentPage - 1) * itemsPerPage;

        const totalCountQuery = 'SELECT COUNT(*) as total FROM vacancies';
        const query = `
            SELECT vacancies.id, vacancies.placement_address, vacancies.description, vacancies.deadline_time, vacancies.id_company, vacancies.created_at, vacancies.updated_at, disability.name AS disability_name, companies.logo AS company_logo, COUNT(job_apply.id_user) AS total_applicants 
            FROM vacancies 
            LEFT JOIN job_apply ON vacancies.id = job_apply.id_vacancy
            JOIN disability ON vacancies.id_disability = disability.id 
            INNER JOIN companies ON vacancies.id_company = companies.id
            GROUP BY vacancies.id 
            ORDER BY total_applicants DESC 
            LIMIT ?, ?
          `;

        db.query(totalCountQuery, (err, countResult) => {
            if (err) {
                console.error('Failed to get total count:', err);
                res.status(500).json({
                    error: 'Failed to get total count'
                });
            } else {
                const totalItems = countResult[0].total;
                db.query(query, [startIndex, itemsPerPage], (err, results) => {
                    if (err) {
                        console.error('Failed to get popular job vacancies:', err);
                        res.status(500).json({
                            error: 'Failed to get popular job vacancies'
                        });
                    } else {
                        const totalPages = Math.ceil(totalItems / itemsPerPage);
                        res.status(200).json({
                            currentPage,
                            totalPages,
                            totalItems,
                            results
                        });
                    }
                });
            }
        });
    },

    latest: async (req, res) => {
        const {
            page,
            perPage
        } = req.query;
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(perPage) || 10;
        const startIndex = (currentPage - 1) * itemsPerPage;

        const totalCountQuery = 'SELECT COUNT(*) as total FROM vacancies';
        const query = `SELECT vacancies.id, vacancies.placement_address, vacancies.description, vacancies.deadline_time, vacancies.id_company, vacancies.created_at, vacancies.updated_at, disability.name AS disability_name, companies.logo AS company_logo
          FROM vacancies 
          JOIN disability ON vacancies.id_disability = disability.id 
          INNER JOIN companies ON vacancies.id_company = companies.id
          ORDER BY created_at DESC LIMIT ?, ?`;

        db.query(totalCountQuery, (err, countResult) => {
            if (err) {
                console.error('Failed to get total count:', err);
                res.status(500).json({
                    error: 'Failed to get total count'
                });
            } else {
                const totalItems = countResult[0].total;
                db.query(query, [startIndex, itemsPerPage], (err, results) => {
                    if (err) {
                        console.error('Failed to get latest job vacancies:', err);
                        res.status(500).json({
                            error: 'Failed to get latest job vacancies'
                        });
                    } else {
                        const totalPages = Math.ceil(totalItems / itemsPerPage);
                        res.status(200).json({
                            currentPage,
                            totalPages,
                            totalItems,
                            results
                        });
                    }
                });
            }
        });
    },

}

module.exports = vacanciesController;