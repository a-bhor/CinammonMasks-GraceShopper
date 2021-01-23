import React from 'react'
import {Link} from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className="not-found-page">
      <br />
      <br />
      <center>
        <h3>
          <Link to="/">Click here to continue shopping</Link>
        </h3>
        <img src="https://pngimage.net/wp-content/uploads/2018/05/empty-cart-png.png" />
      </center>
    </div>
  )
}

export default EmptyCart
