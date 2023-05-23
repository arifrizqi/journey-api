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


const updateCompany = async (id, name, address, city, province, desc, employees, password, sector, email, logo) => {
    try {
      const companyRef = companies.doc(id);
      const companyDoc = await companyRef.get();
  
      if (!companyDoc.exists) {
        return {
          status: 'Error',
          message: 'Company not found!',
        };
      }
  
      let updatedData = {
        name: name || companyDoc.data().name,
        address: address || companyDoc.data().address,
        city: city || companyDoc.data().city,
        province: province || companyDoc.data().province,
        desc: desc || companyDoc.data().desc,
        sector: sector || companyDoc.data().sector,
        employees: employees || companyDoc.data().employees,
        email: email || companyDoc.data().email,
      };
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      }
  
      if (logo) {
        updatedData.logo = logo;
      }
  
      await companyRef.update(updatedData);
  
      return {
        status: 'Success',
      };
    } catch (error) {
      return {
        status: 'Error',
        message: error.message,
      };
    }
  };
  


module.exports = {
    addCompany,
    getAllCompanies,
    getCompanyById,
    deleteCompany,
    updateCompany
};