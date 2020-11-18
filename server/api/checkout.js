const router = require('express').Router()
const Order = require('../db/models/order')

// POST 'api/checkout'
router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      await Order.create({
        shippingAddress: req.body.shippingAddress,
        userId: req.user.id
      })
    } else {
      await Order.create({
        shippingAddress: req.body.shippingAddress
      })
    }
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

module.exports = router
