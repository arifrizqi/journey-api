const HELPERS = require('../helpers/companys-helper');

const addCompany = async (req, res) => {
    let company = req.body;
    let data = await HELPERS.addCompany(company);
    res.send(data);
}

const getAllCompanys = async (req, res) => {
    let getAllCompanys = await HELPERS.getAllCompanys();
    res.send(getAllCompanys);
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
    getAllCompanys,
    getCompanyById,
    deleteCompany,
    updateCompany
};