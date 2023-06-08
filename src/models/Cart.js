const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('modelName', {
   //  userId
   //  productId
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Cart;