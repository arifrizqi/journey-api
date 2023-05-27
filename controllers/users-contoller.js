const db = require('../database/db');
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
        const { full_name, email, password, id_disability, address, profile_photo_url, gender, age, phone_number } = req.body;
        const id = uuidv4();
        const roleId = 1; //

        const sql = `INSERT INTO users (id, full_name, email, password, id_disability, address, profile_photo_url, gender, age, phone_number, created_at, roleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)`;

        const values = [id, full_name, email, password, id_disability, address, profile_photo_url, gender, age, phone_number, roleId];

        db.query(sql, values, (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).json({ status: 'Error', message: 'Terjadi kesalahan dalam menambahkan pengguna' });
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
        try {
            const { id } = req.params;
            const { full_name, email, password, id_disability, address, profile_photo_url, gender, age, phone_number } = req.body;
        
            const sql = `UPDATE users SET full_name = ?, email = ?, password = ?, id_disability = ?, address = ?, profile_photo_url = ?, gender = ?, age = ?, phone_number = ?, WHERE id = ?`;
            const values = [full_name, email, password, id_disability, address, profile_photo_url, gender, age, phone_number, id];
        
            await query(sql, values);
        
            res.json({ status: 'Success', message: 'Pengguna berhasil diperbarui' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'Error', message: 'Terjadi kesalahan dalam memperbarui pengguna' });
          }
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