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
const usersController = {
    addUser: async (req, res) => {
        const { full_name, email, password, skill_one, skill_two, id_disability, address, gender, age, phone_number } = req.body;
        const id = uuidv4();
        const roleId = 1; //
        var profile_photo_url = 'https://storage.googleapis.com/journey-bangkit/profile.png'

      //   if (req.file && req.file.cloudStoragePublicUrl) {
      //     profile_photo_url = req.file.cloudStoragePublicUrl
      // }

      const hash = bcrypt.hashSync(password, 10);

        const sql = `INSERT INTO users (id, full_name, email, password, skill_one, skill_two, id_disability, address, profile_photo_url, gender, age, phone_number, created_at, roleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)`;

        const values = [id, full_name, email, hash, skill_one, skill_two, id_disability, address, profile_photo_url, gender, age, phone_number, roleId];

        db.query(sql, values, (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).json({ status: 'Error', message: err.sqlMessage });
            } else {
              res.json({ status: 'Success', message: 'Pengguna berhasil ditambahkan', id });
            }
          });
    },

    getAllUsers: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const startIndex = (page - 1) * limit;
        
            const countSql = 'SELECT COUNT(*) as total FROM users';
            const countResult = await query(countSql);
            const totalUsers = countResult[0].total;
        
            const sql = 'SELECT * FROM users LIMIT ?, ?';
            const values = [startIndex, parseInt(limit)];
        
            const result = await query(sql, values);
        
            const users = result.map((user) => {
              const tempData = { ...user };
              tempData.id = user.id;
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
            res.status(500).json({ status: 'Error', message: 'Terjadi kesalahan dalam memuat pengguna' });
          }
    },

    getUserById: async (req, res) => {
        const { id } = req.params;

        const sql = `SELECT * FROM users WHERE id = ?`;
        const values = [id];

        db.query(sql, values, (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).json({ status: 'Error', message: 'Terjadi kesalahan dalam memuat pengguna' });
            } else {
              if (result.length === 0) {
                res.status(404).json({ status: 'Error', message: 'Pengguna tidak ditemukan' });
              } else {
                const user = result[0];
                res.json({ status: 'Success', user });
              }
            }
          });
    },

    updateUser: async (req, res) => {
      const userId = req.params.id; // Mengambil ID perusahaan dari parameter permintaan
      const { full_name, email, password, id_disability, address, gender, age, phone_number, skill_one, skill_two } = req.body;
  
      // Periksa apakah ada file gambar yang diunggah
      let profile_photo_url = '';
      if (req.file && req.file.cloudStoragePublicUrl) {
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
          res.status(500).send({ message: err.sqlMessage });
        } else {
          res.send({ message: "Update Successful" });
        }
      });
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
        
            const sql = `DELETE FROM users WHERE id = ?`;
            const values = [id];
        
            await query(sql, values);
        
            res.json({ status: 'Success', message: 'Pengguna berhasil dihapus' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'Error', message: 'Terjadi kesalahan dalam menghapus pengguna' });
          }
    }

    
}

module.exports = usersController;