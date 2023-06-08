const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');

const getAll = catchError(async(req, res) => {
    const puerchase = await Purchase.findAll();
    return res.json(puerchase);
});

const create = catchError(async(req, res) => {
    const purchase = await Purchase.create(req.body);
    return res.status(201).json(purchase);
});


module.exports = {
    getAll,
    create
}