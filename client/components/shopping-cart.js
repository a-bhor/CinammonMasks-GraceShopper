import {Button} from '@material-ui/core'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, getMasks, updateCart, deleteFromCart} from '../store'
import CartDetails from './cart-details'
import EmptyCart from './empty-cart'

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const maskId = event.target.id
    const newQty = parseInt(event.target.value)

    if (newQty === 0) {
      console.log('Calling delete from cart, qty = ', newQty)
      this.props.deleteFromCart(maskId)
    } else {
      console.log('Calling update the cart, qty = ', newQty)
      this.props.updateCart(maskId, newQty)
    }
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
    // loadCartDetails(this.props)
    const cart = Object.entries(this.props.cart)

    //Get the mask details for all the masks from the cart
    const cartDetails = cart.map(([maskId, quantity]) => {
      let [maskDetails] = this.props.allMasks.filter(
        mask => +mask.id === +maskId
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
      <div id="shopping-cart">
        {cartDetails.length ? (
          <div>
            <CartDetails
              cartDetails={cartDetails}
              totalPrice={totalPrice}
              handleChange={this.handleChange}
            />
            <Link to="/checkout">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                className="checkout"
                style={{
                  maxWidth: '200px',
                  maxHeight: '100px',
                  minWidth: '150px',
                  minHeight: '50px',
                  fontSize: '16px'
                }}
              >
                Checkout
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <EmptyCart />
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
    getMasks: () => dispatch(getMasks()),
    updateCart: (maskId, quantity) => dispatch(updateCart(maskId, quantity)),
    deleteFromCart: maskId => dispatch(deleteFromCart(maskId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
