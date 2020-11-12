const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('order-detail', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = OrderDetail
