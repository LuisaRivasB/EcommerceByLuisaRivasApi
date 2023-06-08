const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const cart = await Cart.findAll();
    return res.json(cart);
});

const create = catchError(async(req, res) => {
    const cart = await Cart.create(req.body);
    return res.status(201).json(cart);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
    if(!cart) return res.sendStatus(404);
    return res.json(cart);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Cart.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const cart = await Cart.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(cart[0] === 0) return res.sendStatus(404);
    return res.json(cart[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}