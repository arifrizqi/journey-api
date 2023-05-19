const HELPERS = require('../helpers/companies-helper');

const addCompany = async (req, res) => {
    let company = req.body;
    let data = await HELPERS.addCompany(company);
    res.send(data);
}

const getAllCompanies = async (req, res) => {
    let getAllCompanies = await HELPERS.getAllCompanies();
    res.send(getAllCompanies);
}

const getCompanyById = async (req, res) => {
    const { id } = req.params;
    const userData = await HELPERS.getCompanyById(id);
    res.send(userData);
}

const deleteCompany = async (req, res) => {
    const { id } = req.params;
    const userData = await HELPERS.deleteCompany(id);
    res.send(userData);
}

const updateCompany = async (req, res) => {
    const { id } = req.params;
    const { name, address, city, province, logo, desc, empolyees, sector, email, password } = req.body;
    const userData = await HELPERS.updateCompany(id, name, address, city, province, logo, desc, empolyees, sector, email, password);
    res.send(userData);
}


module.exports = { 
    addCompany,
    getAllCompanies,
    getCompanyById,
    deleteCompany,
    updateCompany
};