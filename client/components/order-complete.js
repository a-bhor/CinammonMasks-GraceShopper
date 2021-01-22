import React from 'react'
import {Link} from 'react-router-dom'

export default function OrderComplete() {
  return (
    <div className="order-complete">
      <Link to="/">
        <h2>Your order has been placed!</h2>
        Click to continue browsing Cinnamon Masks
        <p />
        <img
          className="order-complete-img"
          src="https://i.pinimg.com/originals/05/15/b2/0515b2e934c39d9599088a5145f6b823.jpg"
        />
      </Link>
    </div>
  )
}
