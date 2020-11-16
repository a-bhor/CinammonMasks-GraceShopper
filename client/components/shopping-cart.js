import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchCart, getMasks} from '../store'
// import Grid from '@material-ui/core/Grid'

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    /**
     * ARCHANA: Actually we may not need any of these fetch methods,
     * because state already should have loaded cart and allMasks before ever reaching shopping cart
     */
    this.props.getMasks()
    this.props.getCart()
  }

  render() {
    // Get all the masks in the state cart into an array form.
    // It will return array in the form of :
    // [[maskId1, quantity], [maskId2, quantity], ... and so on]
    const cart = Object.entries(this.props.cart)

    //Get the mask details for all the masks from the cart
    const cartDetails = cart.map(([maskId, quantity]) => {
      const [maskDetails] = this.props.allMasks.filter(
        mask => mask.id === maskId
      )
      return {...maskDetails, quantity}
    })
    let totalPrice = 0
    if (cartDetails.length) {
      totalPrice = cartDetails.reduce(
        (accumulator, currentMask) =>
          accumulator + currentMask.quantity * currentMask.price,
        0
      )
    }

    return (
      <div>
        {cartDetails.length ? (
          <div>
            {' '}
            <h3>{cartDetails.length} records in cart</h3>{' '}
          </div>
        ) : (
          <div>
            <h3> Let's go shopping!</h3>{' '}
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cart: state.cart,
  allMasks: state.allMasks
})
const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(fetchCart()),
    getMasks: () => dispatch(getMasks())
    // updateCart : () => dispatch(updateCart(maskId, quantity)),
    // deleteFromCart: ()=> dispatch(deletFromCart(maskId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
