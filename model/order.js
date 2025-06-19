const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Customer = require('./customer'); // เชื่อมโยงกับ model ของ Customers

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'Orders',
  timestamps: false, // เนื่องจากใช้ `order_date` แทน `createdAt` ใน Sequelize
});

// การเชื่อมโยงกับตาราง Customers
Order.belongsTo(Customer, {
  foreignKey: 'customer_id',
  targetKey: 'customer_id',
});

module.exports = Order;