const express = require('express')

//when posting: destruct only what you need off of req.body
const adminOnly = (req, res, next) => {
  try {
    //if testing, adminOnly doesn't apply
    if (process.env.NODE_ENV === 'test') {
      return next()
    } else {
      //else adminOnly restrictions apply
      if (typeof req.user === 'undefined' || !req.user.isAdmin) {
        const err = new Error('401 Unauthorized')
        err.status = 401
        return next(err)
      }
    }
  } catch (error) {
    next(error)
  }
}

//only users can access this route if they are the owner of

module.exports = adminOnly
