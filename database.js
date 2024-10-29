const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'tu_contraseña', {
    host: 'localhost',
    dialect: 'mysql', // o 'postgres' si usas PostgreSQL
});

module.exports = sequelize;

const sequelize = require('./database');
//const Product = require('./Product');
//const User = require('./User');
//const Order = require('./Order');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // fuerza la sincronización, ten cuidado con esto
        console.log('Base de datos sincronizada.');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
};

syncDatabase();

// Crear un producto
const createProduct = async (productData) => {
    try {
        const product = await Product.create(productData);
        return product;
    } catch (error) {
        console.error('Error al crear el producto:', error);
    }
};

// Obtener todos los productos
const getProducts = async () => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};

const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
};