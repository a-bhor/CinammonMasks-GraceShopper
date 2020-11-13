const {Mask} = require('../db/models')
const router = require('express').Router()

// GET api/masks
router.get('/', async (req, res, next) => {
  try {
    //get all masks from db and send back
    const masks = await Mask.findAll()
    res.json(masks)
  } catch (error) {
    next(error)
  }
})

module.exports = router
//when posting: destruct only what you need off of req.body
