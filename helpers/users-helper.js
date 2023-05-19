const admin = require('firebase-admin');
const timestamp = admin.firestore.Timestamp.fromDate(new Date());
const bcrypt = require('bcrypt');
const firestore = require('../config/firebase-config')

const users = firestore.collection('users');

const addUser = async (user) => {
    try {
        const { password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userWithTimestamp = {
            ...user,
            created_at: timestamp,
            password: hashedPassword
        }

        let data = await users.add(userWithTimestamp);
        return {
            status: 'Success',
            id: data.id
        }
    } catch (error) {
        return { 
            status: 'Failed',
        }
    }
}

const getAllUsers = async () => {
    try {
        let getAllUsers = await users.get();
        if (getAllUsers.empty) {
            return {
                status: 'Data is empty!',
                users: []
            }
        } else {
            let users = [];
            getAllUsers.forEach((getAllUser) => {
                let tempData = getAllUser.data();
                tempData['id'] = getAllUser.id;
                users.push(tempData);
            });
            return {
                status: 'Success',
                users: users
            };
        }
        
    } catch (error) {
        return {
            status: 'Error'
        }
    }
}

const getUserById = async (id) => {
    try {
        const userRef = users.doc(id);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
            const userData = userDoc.data();
            return {
                status: 'Success',
                data: userData
            };
        } else {
            return {
                status: 'Error',
                message: 'User not found'
            };
        }
    } catch (error) {
        return {
            status: 'Error',
            message: 'Error getting user'
        };
    }
}

const deleteUser = async (id) => {
    try {
        await users.doc(id).delete();
        return {
            status: 'success'
        }
    } catch (error) {
        return {
            status: 'Error'
        }
    }
}

const updateUser = async (id, full_name, email, age, gender, address, disability, password) => {
    try {
        const userRef = users.doc(id);
        const userDoc = await userRef.get();
    
        if (!userDoc.exists) {
          res.status(404).send('User not found!');
          return;
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await userRef.update({
            full_name: full_name || userDoc.data().full_name,
            email: email || userDoc.data().email,
            age: age || userDoc.data().age,
            gender: gender || userDoc.data().gender,
            address: address || userDoc.data().address,
            disability: disability || userDoc.data().disability,
            password: hashedPassword || userDoc.data().password
        });
    
        return {
            status: 'Success'
        }
      } catch (error) {
        return {
            status: 'Error'
        }
      } 
}


module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser
};