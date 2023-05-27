const db = require('../database/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const multer = require('../middlewares/multer');
const uploadToGCS = require('../utils/uploadToGCS');

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
    try {
      const { name, address, city, province, description, employees, id_sector, email, password } = req.body;

      // Generate UUID untuk id
      const id = uuidv4();

      // Role ID sudah ditentukan yaitu 2
      const roleId = 2;

      // Enkripsi password menggunakan bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Upload logo ke Google Cloud Storage
      const logoUrl = await uploadToGCS(req.file);

      // Query untuk menyimpan data perusahaan baru
      const queryStr = `
        INSERT INTO companies (id, name, address, city, province, logo, description, employees, id_sector, email, password, roleId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Eksekusi query dengan parameter yang sesuai
      await query(queryStr, [id, name, address, city, province, logoUrl, description, employees, id_sector, email, hashedPassword, roleId]);

      res.status(201).json({ message: 'Company created successfully', id });
    } catch (error) {
      console.error('Error creating company:', error);
      res.status(500).json({ message: 'An error occurred while creating the company' });
    }
  },
};

module.exports = companiesController;
