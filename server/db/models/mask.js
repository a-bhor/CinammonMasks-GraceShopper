const Sequelize = require('sequelize')
const db = require('../db')
const SOLID_STYLE = 'Solids'
const FLORAL_STYLE = 'Florals'
const PATTERNED_STYLE = 'Patterned'

const Mask = db.define('mask', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
    //can be empty or null...
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://pyxis.nymag.com/v1/imgs/792/744/5383f403a31a016c2a4fe338b6b97c14ee-BaubleBar.rdeep-vertical.w245.png'
  },
  style: {
    type: Sequelize.ENUM,
    values: [SOLID_STYLE, FLORAL_STYLE, PATTERNED_STYLE]
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  inventoryQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})
module.exports = Mask
