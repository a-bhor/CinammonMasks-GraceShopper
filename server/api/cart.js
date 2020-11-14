const {Order, Mask, User} = require('../db/models')
const router = require('express').Router()

// GET 'api/cart

// GET /cart
router.get('/', async (req, res, next) => {
  try {
    console.log('test)')
    if (req.user) {
      const cart = await req.user.getCart()
      console.log(cart)
      res.json(cart)
    }
    //get all masks from db and send back
  } catch (error) {
    next(error)
  }
})

module.exports = router
