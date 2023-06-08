const { getAll, create } = require('../controllers/purchase.controllers');
const express = require('express');

const purchaseRouter = express.Router();

purchaseRouter.route('/')
    .get(getAll)
    .post(create);



module.exports = purchaseRouter;