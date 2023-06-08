const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductImg);
ProductImg.belongsTo(Product);