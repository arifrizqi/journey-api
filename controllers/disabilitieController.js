const db = require('../models')

// model
const Disabilitie = db.disabilities

// functions

//1. Add Review

const addDisabilitie = async (req, res) => {
    if (!req.body.disabilitie) {
        return res.status(400).send('Disability field is required');
    }

    let data = {
        disability: req.body.disability
    };

    try {
        const disabilitie = await Disabilitie.create(data);
        res.status(200).send(disabilitie);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

// 2. Get All Reviews

const getAllDisabilities = async (req, res) => {

    const disabilities = await Disabilitie.findAll({})
    res.status(200).send(disabilities)

}

module.exports = {
    addDisabilitie,
    getAllDisabilities
}