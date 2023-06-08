const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const express = require('express');

const cartRouter = express.Router();

cartRouter.route('/')
    .get(getAll)
    .post(create);

cartRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = cartRouter;