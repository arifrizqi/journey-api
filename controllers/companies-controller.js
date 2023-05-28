const db = require('../database/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

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
    // const id = req.body.id
    const id = uuidv4();
    const name = req.body.name
    const address = req.body.address
    const city = req.body.city
    const province = req.body.province
    var logo = ''
    const description = req.body.description
    const employees = req.body.employees
    const id_sector = req.body.id_sector
    const email = req.body.email
    const password = req.body.password
    const roleId = 2

    if (req.file && req.file.cloudStoragePublicUrl) {
        logo = req.file.cloudStoragePublicUrl
    }

    const hash = bcrypt.hashSync(password, 10);

    const query = "INSERT INTO companies (id, name, address, city, province, logo, description, employees, id_sector, email, password, roleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

    db.query(query, [id, name, address, city, province, logo, description, employees, id_sector, email, hash, roleId], (err, rows, fields) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage})
        } else {
            res.send({message: "Insert Successful"})
        }
    });
  },

  updateCompany: async (req, res) => {
    const companyId = req.params.id; // Mengambil ID perusahaan dari parameter permintaan
    const { name, address, city, province, description, employees, id_sector, email, password } = req.body;

    // Periksa apakah ada file gambar yang diunggah
    let logo = '';
    if (req.file && req.file.cloudStoragePublicUrl) {
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
      description = COALESCE(?, description), 
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
      description,
      employees,
      id_sector,
      email,
      hash,
      companyId
    ];

    db.query(query, values, (err, rows, fields) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage });
      } else {
        res.send({ message: "Update Successful" });
      }
    });
  },

  getAllCompanies: async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const startIndex = (page - 1) * limit;
    
        const countSql = 'SELECT COUNT(*) as total FROM companies';
        const countResult = await query(countSql);
        const totalCompanies = countResult[0].total;
    
        const sql = 'SELECT * FROM companies LIMIT ?, ?';
        const values = [startIndex, parseInt(limit)];
    
        const result = await query(sql, values);
    
        const companies = result.map((company) => {
          const tempData = { ...company };
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
        res.status(500).json({ status: 'Error', message: 'Terjadi kesalahan dalam memuat pengguna' });
      }
  },

  getCompanyById: async (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM companies WHERE id = ?`;
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ status: 'Error', message: 'Terjadi kesalahan dalam memuat company' });
        } else {
          if (result.length === 0) {
            res.status(404).json({ status: 'Error', message: 'Company tidak ditemukan' });
          } else {
            const company = result[0];
            res.json({ status: 'Success', company });
          }
        }
      });
    },

    deleteCompany: async (req, res) => {
      try {
          const { id } = req.params;
      
          const sql = `DELETE FROM companies WHERE id = ?`;
          const values = [id];
      
          await query(sql, values);
      
          res.json({ status: 'Success', message: 'Company berhasil dihapus' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ status: 'Error', message: 'Terjadi kesalahan dalam menghapus Company' });
        }
    }
};

module.exports = companiesController;
