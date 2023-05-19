const bcrypt = require('bcrypt');
const firestore = require('../config/firebase-config')

const companies = firestore.collection('companies');

const addCompany = async (company) => {
    try {
        const { password } = company;
        const hashedPassword = await bcrypt.hash(password, 10);
        const companyWithHashedPassword = {
            ...company,
            password: hashedPassword
        }
        let data = await companies.add(companyWithHashedPassword);
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

const getAllCompanies = async () => {
    try {
        let getAllCompanies = await companies.get();
        if (getAllCompanies.empty) {
            return {
                status: 'Data is empty!',
                companies: []
            }
        } else {
            let companies = [];
            getAllCompanies.forEach((getAllCompany) => {
                let tempData = getAllCompany.data();
                tempData['id'] = getAllCompany.id;
                companies.push(tempData);
            });
            return {
                status: 'Success',
                companies: companies
            };
        }
        
    } catch (error) {
        return {
            status: 'Error'
        }
    }
}

const getCompanyById = async (id) => {
    try {
        const userRef = companies.doc(id);
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
                message: 'Company not found'
            };
        }
    } catch (error) {
        return {
            status: 'Error',
            message: 'Error getting company'
        };
    }
}

const deleteCompany = async (id) => {
    try {
        await companies.doc(id).delete();
        return {
            status: 'success'
        }
    } catch (error) {
        return {
            status: 'Error'
        }
    }
}


const updateCompany = async (id, name, address, city, province, logo, desc, empolyees, sector, email, password) => {
    try {
        const userRef = companies.doc(id);
        const userDoc = await userRef.get();
    
        if (!userDoc.exists) {
          res.status(404).send('User not found!');
          return;
        }
        let hashedPassword = userDoc.data().password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        await userRef.update({
            name: name || userDoc.data().name,
            address: address || userDoc.data().address,
            city: city || userDoc.data().city,
            province: province || userDoc.data().province,
            logo: logo || userDoc.data().logo,
            desc: desc || userDoc.data().desc,
            empolyees: empolyees || userDoc.data().empolyees,
            sector: sector || userDoc.data().sector,
            email: email || userDoc.data().email,
            password: hashedPassword
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
    addCompany,
    getAllCompanies,
    getCompanyById,
    deleteCompany,
    updateCompany
};