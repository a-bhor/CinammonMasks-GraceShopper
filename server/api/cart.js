const router = require('express').Router()
const {Order} = require('../db/models')
// const {User} = require('../db/models')

// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    //If this is a logged in user, then request object will have user setup on it by the login authentication
    // Refer router.post('/login') from "./server/auth/index.js"
    if (req.user) {
      // console.log('req.user id is : ', req.user.id)
      const cart = await req.user.getCart()
      res.json(cart)
    } else {
      // We should not come  to this route (the THUNK for fetchCart should take care of setting the cart locally for non-logged in users)
      // But by any chance if we do, then we will just send an empty array in place of cart.

      res.send({})

      // /*****
      //  * ARCHANA: in case you want to test this API on POSTMAN (with some specific user Id)
      //  * use this code. Just change the userId. Don't forget to uncomment prev empty res.send

      // const userId = 2
      // const user = await User.findByPk(userId)
      // const cart1 = await user.getCart()
      // console.log(cart1)
      // res.json(cart1)

      //  */
    }
  } catch (error) {
    next(error)
  }
})

// POST /api/cart
router.post('/:maskId', async (req, res, next) => {
  try {
    const userId = 2 //req.user.id
    const [cart, created] = await Order.findOrCreate({
      where: {
        isSubmitted: false,
        userId: userId
      }
    })

    // First check if current cart (order) already has a record for the given mask
    // If yes, then we need to modify that record in "order-detail" table by increasing the quantity
    // If NO, then we need to add this mask to the current cart (order)
    const maskId = parseInt(req.params.maskId) //parseInt was needed because hasMask was not working without it
    const cartHasMask = await cart.hasMask(maskId)

    // console.log('maskId : ', maskId)
    // console.log('cartHasMask : ', cartHasMask)

    if (cartHasMask) {
      //update this mask record
      const [maskFromExistingCart] = await cart.getMasks({
        where: {
          id: maskId
        }
      })
      const currentQty = maskFromExistingCart['order-detail'].quantity
      maskFromExistingCart['order-detail'].quantity =
        currentQty + req.body.quantity
      await maskFromExistingCart['order-detail'].save()
    } else {
      //create new mask record for this order
      await cart.addMask(maskId, {
        through: {quantity: req.body.quantity, price: req.body.price}
      })
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
