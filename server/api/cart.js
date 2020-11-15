const router = require('express').Router()
const {User, Order, OrderDetail} = require('../db/models')

// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    //If this is a logged in user, then request object will have user setup on it by the login authentication
    // Refer router.post('/login') from "./server/auth/index.js"
    if (req.user) {
      const cart = await req.user.getCart()
      // console.log(cart)
      res.json(cart)
    } else {
      // We should not come  to this route (the THUNK for fetchCart should take care of setting the cart locally for non-logged in users)
      // But by any chance if we do, then we will just send an empty array in place of cart.

      res.send([])

      // /*****
      //  * ARCHANA: in case you want to test this API on POSTMAN (with some specific user Id)
      //  * use this code. Just change the userId. Don't forget to uncomment prev empty res.send

      // const userId = 2
      // const user = await User.findByPk(userId)
      // const cart1 = await user.getCart()
      // res.json(cart1)

      //  */
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {maskId} = req.body
    const {quantity} = req.body

    // first time adding to cart
    // need to create an instance in db
    Order.create({
      userId: req.user.id
    })

    OrderDetail.create({
      orderId: Order.id,
      quantity: quantity,
      maskId: maskId
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  // cart exists, need to update
  // if the cart has items, check if mask has already been added
  // for(let mask of cart) ...
  //   if (mask.id === singleMask.id) ...
  // need to change order-detail syntax
  // if it has, change the quantity
  // mask.orderdetails.quantity += quantity
  // send updated cart back
})

module.exports = router
