const router = require('express').Router()
// const {User} = require('../db/models')

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

module.exports = router
