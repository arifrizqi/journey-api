const HELPERS = require('../helpers/companies-helper');
const multer = require('../middlewares/multer');
const uploadToGCS = require('../utils/uploadToGCS');

const addCompany = async (req, res) => {
    // handle file upload
    multer.single('logo')(req, res, async function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        let company = req.body;

        // upload file to Google Cloud Storage
        if (req.file) {
            const imageUrl = await uploadToGCS(req.file);
            company.logo = imageUrl;
        }

        let data = await HELPERS.addCompany(company);
        res.send(data);
    });
}

const getAllCompanies = async (req, res) => {
    let getAllCompanies = await HELPERS.getAllCompanies();
    res.send(getAllCompanies);
}

const getCompanyById = async (req, res) => {
    const { id } = req.params;
    const companyData = await HELPERS.getCompanyById(id);
    res.send(companyData);
}

const deleteCompany = async (req, res) => {
    const { id } = req.params;
    const companyData = await HELPERS.deleteCompany(id);
    res.send(companyData);
}

const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, city, province, desc, employees, sector, email, password } = req.body;

        multer.single('logo')(req, res, async function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            let logo = req.file;

            if (logo) {
                const imageUrl = await uploadToGCS(logo);
                logo = imageUrl;
            }

            const companyData = await HELPERS.updateCompany(
                id,
                name,
                address,
                city,
                province,
                desc,
                employees,
                sector,
                email,
                password,
                logo
            );

            if (companyData.status === 'Success') {
                // Pembaruan berhasil
                // const updatedCompanyData = await HELPERS.getCompanyById(id);
                res.send({
                    status: 'Success'
                });
            } else {
                // Perusahaan tidak ditemukan
                res.status(404).send({ status: 'Error', message: 'Company not found!' });
            }
        });
    } catch (error) {
        // Kesalahan server
        res.status(500).send({ status: 'Error', message: error.message });
    }
};


module.exports = { 
    addCompany,
    getAllCompanies,
    getCompanyById,
    deleteCompany,
    updateCompany
};