const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Order = require('./order'); // เชื่อมโยงกับ model ของ Orders
const Product = require('./product'); // เชื่อมโยงกับ model ของ Products

const OrderItem = sequelize.define('OrderItem', {
  order_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'OrderItems',
  timestamps: false, // ใช้ฟิลด์ที่กำหนดเองแทน `createdAt`
});

// การเชื่อมโยงกับตาราง Orders
OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
  targetKey: 'order_id',
});

// การเชื่อมโยงกับตาราง Products
OrderItem.belongsTo(Product, {
  foreignKey: 'product_id',
  targetKey: 'product_id',
});

module.exports = OrderItem;