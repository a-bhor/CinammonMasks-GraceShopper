const express = require('express')

//when posting: destruct only what you need off of req.body
const adminOnly = (req, res, next) => {
  try {
    if (typeof req.user === 'undefined' || !req.user.isAdmin) {
      const err = new Error('401 Unauthorized')
      err.status = 401
      return next(err)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = adminOnly
