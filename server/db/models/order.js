const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingAddress: {
    type: Sequelize.STRING
  },
  billingAddress: {
    type: Sequelize.STRING
  },
  total: {
    type: Sequelize.INTEGER
  },
  isSubmitted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
