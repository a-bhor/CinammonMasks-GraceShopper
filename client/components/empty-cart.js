import React from 'react'
import {Link} from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className="not-found-page">
      <br />
      <br />
      <center>
        <h3>
          Click{' '}
          <Link to="/">
            <u> here </u>
          </Link>
          to continue shopping
        </h3>
        {/* <img src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png" /> */}
        <img src="https://pngimage.net/wp-content/uploads/2018/05/empty-cart-png.png" />
      </center>
    </div>
  )
}

export default EmptyCart
