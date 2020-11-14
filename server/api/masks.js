const {Mask} = require('../db/models/')
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

router.get('/:maskId', async (req, res, next) => {
  try {
    const singleMask = await Mask.findOne({
      where: {
        id: req.params.maskId
      }
    })
    res.json(singleMask)
  } catch (error) {
    next(error)
  }
})

// // POST '/api/masks'
// router.post('/', async (req, res, next) => {
//   try {
//     // req.body?
//     const newMask = await Mask.create(req.body)
//     res.json(newMask)
//   } catch (error) {
//     next(error)
//   }
// })

// // DELETE '/api/masks/id'
// router.delete('/:maskId', async (req, res, next) => {
//   try {
//     await Mask.destroy({
//       where: {
//         id: req.params.maskId
//       }
//     })
//     res.sendStatus(204)
//   } catch (error) {
//     next(error)
//   }
// })

// // UPDATE 'api/masks/id'
// router.put('/:maskId', async (req, res, next) => {
//   try {
//     const updatedMask = await Mask.findByPk(req.params.maskId)
//     // req.body?
//     updatedMask.update(req.body)
//     res.json(updatedMask)
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
//when posting: destruct only what you need off of req.body
