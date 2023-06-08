const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');


const getAll = catchError(async(req, res) => {
    const product = await Product.findAll({
        include: [ {
            model: [ Category, ProductImg ],
            attributes: ["name", "id"]
        },
        {
            model: ProductImg,
        }]
    });
    return res.json(product);
});

const create = catchError(async(req, res) => {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product) return res.sendStatus(404);
    return res.json(product);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(product[0] === 0) return res.sendStatus(404);
    return res.json(product[1][0]);
});

const setProductImgs = catchError(async(req, res) => {
    const { id } = req.params;
    const products = await Product.findByPk(id);
    if(!products) return res.status(404).json({ message: "Product not found" });
    await products.setProductImgs(req.body);
    const images = await products.getProductImgs();
    return res.json(images)
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setProductImgs
}