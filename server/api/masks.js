const {Mask} = require('../db/models/')
const router = require('express').Router()
const adminOnly = require('./accessControl')

// GET 'api/masks'
router.get('/', async (req, res, next) => {
  try {
    //get all masks from db and send back
    const masks = await Mask.findAll()
    res.json(masks)
  } catch (error) {
    next(error)
  }
})

// GET 'api/masks/:maskId'
router.get('/:maskId', async (req, res, next) => {
  try {
    const singleMask = await Mask.findOne({
      where: {
        id: req.params.maskId
      }
    })

    //     console.log('INSIDE API CALL!', singleMask)

    res.json(singleMask)
  } catch (error) {
    next(error)
  }
})

// POST '/api/masks' ADMIN ONLY
router.post('/', adminOnly, async (req, res, next) => {
  try {
    const {name, description, imageUrl, style, price, inventoryQty} = req.body
    const newMask = await Mask.create({
      name,
      description,
      imageUrl,
      style,
      price,
      inventoryQty
    })
    res.json(newMask)
  } catch (error) {
    next(error)
  }
})

// DELETE '/api/masks/id' ADMIN ONLY
router.delete('/:maskId', adminOnly, async (req, res, next) => {
  try {
    await Mask.destroy({
      where: {
        id: req.params.maskId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// UPDATE 'api/masks/id' ADMIN ONLY
router.put('/:maskId', adminOnly, async (req, res, next) => {
  try {
    const updatedMask = await Mask.findByPk(req.params.maskId)
    const {name, description, imageUrl, style, price, inventoryQty} = req.body
    updatedMask.update({
      name,
      description,
      imageUrl,
      style,
      price,
      inventoryQty
    })
    res.json(updatedMask)
  } catch (error) {
    next(error)
  }
})

module.exports = router
