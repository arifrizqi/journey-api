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
          const { page = 1, limit = 10 } = req.query;
          const startIndex = (page - 1) * limit;
      
          const countSql = 'SELECT COUNT(*) as total FROM vacancies';
          const countResult = await query(countSql);
          const totalVacancies = countResult[0].total;
      
          const sql = `SELECT vacancies.id, vacancies.placement_address, vacancies.description, vacancies.sector, vacancies.created_at, vacancies.updated_at,
                       disability.name AS disability_name, vacancies.deadline_time, companies.name AS company_name
                       FROM vacancies
                       INNER JOIN disability ON vacancies.id_disability = disability.id
                       INNER JOIN companies ON vacancies.id_company = companies.id
                       LIMIT ?, ?`;
      
          const values = [startIndex, parseInt(limit)];
      
          const result = await query(sql, values);
      
          const vacancies = result.map((vacancy) => {
            const tempData = { ...vacancy };
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
          res.status(500).json({ status: 'Error', message: 'An error occurred loading vacancy' });
        }
      },

      getVacancyById: async (req, res) => {
        const { id } = req.params;
    
        const sql = `SELECT vacancies.id, vacancies.placement_address, vacancies.description, vacancies.sector, vacancies.created_at, vacancies.updated_at,
        disability.name AS disability_name, vacancies.deadline_time, companies.name AS company_name
        FROM vacancies
        INNER JOIN disability ON vacancies.id_disability = disability.id
        INNER JOIN companies ON vacancies.id_company = companies.id WHERE vacancies.id = ?`;
        const values = [id];
    
        db.query(sql, values, (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).json({ status: 'Error', message: 'An error occurred loading vacancy' });
            } else {
              if (result.length === 0) {
                res.status(404).json({ status: 'Error', message: 'vacancy not found' });
              } else {
                const vacancy = result[0];
                res.json({ status: 'Success', vacancy });
              }
            }
          });
        },

        updateVacancy: async (req, res) => {
            const vacancyId = req.params.id;
            const { placement_address, description, sector, id_disability, deadline_time, id_company } = req.body;
          
            const query = `UPDATE vacancies SET 
              placement_address = COALESCE(?, placement_address),
              description = COALESCE(?, description),
              sector = COALESCE(?, sector),
              id_disability = COALESCE(?, id_disability),
              deadline_time = COALESCE(?, deadline_time),
              id_company = COALESCE(?, id_company),
              updated_at = CURRENT_TIMESTAMP
              WHERE id = ?`;
          
            const values = [
              placement_address,
              description,
              sector,
              id_disability,
              deadline_time,
              id_company,
              vacancyId
            ];
          
            db.query(query, values, (err, rows, fields) => {
              if (err) {
                res.status(500).send({ message: err.sqlMessage });
              } else {
                res.send({ message: "Update Successful" });
              }
            });
          },
          
        
        
        deleteVacancy: async (req, res) => {
            const { id } = req.params;
    
            const sql = `DELETE FROM vacancies WHERE id = ?`;
            const values = [id];
    
            try {
                await query(sql, values);
                res.json({ status: 'Success', message: 'Vacancy deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ status: 'Error', message: 'An error occurred while deleting a vacancy' });
            }
        }
      
}

module.exports = vacanciesController;