const firestore = require('../config/firebase-config')

const companys = firestore.collection('companys');

const addCompany = async (company) => {
    try {
        let data = await companys.add(company);
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

const getAllCompanys = async () => {
    try {
        let getAllcompanys = await companys.get();
        if (getAllcompanys.empty) {
            return {
                status: 'Data is empty!',
                companys: []
            }
        } else {
            let companys = [];
            getAllcompanys.forEach((getAllCompany) => {
                let tempData = getAllCompany.data();
                tempData['id'] = getAllCompany.id;
                companys.push(tempData);
            });
            return {
                status: 'Success',
                companys: companys
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
        const userRef = companys.doc(id);
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
        await companys.doc(id).delete();
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
        const userRef = companys.doc(id);
        const userDoc = await userRef.get();
    
        if (!userDoc.exists) {
          res.status(404).send('User not found!');
          return;
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
            password: password || userDoc.data().password,
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
    getAllCompanys,
    getCompanyById,
    deleteCompany,
    updateCompany
};