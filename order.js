const { DataTypes } = require('sequelize');
const sequelize = require('./database');
//const User = require('./User');

const Order = sequelize.define('Order', {
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

Order.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Order;