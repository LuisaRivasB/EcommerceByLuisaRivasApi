const sequelize = require('../utils/connection');
const User = require('../models/User');
require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models/Cart');
require('../models');


const main = async() => {
    try{
        await sequelize.sync({ force: true });

        await User.create({
            firstName: "Juan",
            lastName: "Rivas",
            email: "juan@academlo.com",
            password: "academlo",
            phone: "123456789"
        });
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();