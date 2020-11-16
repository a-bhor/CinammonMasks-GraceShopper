import {Button} from '@material-ui/core'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchCart, getMasks} from '../store'
// import Grid from '@material-ui/core/Grid'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

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
    console.log('cartDetails: ')
    console.log(cartDetails)
    console.log('total price: ', totalPrice)

    return (
      <div>
        {cartDetails.length ? (
          <div>
            <h3>{cartDetails.length} records in cart</h3>
            {/* <CartDetails cartDetails={cartDetails}/> */}
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartDetails.map(mask => (
                    <TableRow key={mask.id}>
                      <TableCell align="left">{mask.name}</TableCell>
                      <TableCell align="right">{mask.quantity}</TableCell>
                      <TableCell align="right">{mask.price}.00</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            {/* <Button> Checkout </Button>
            <Button> Cancel</Button> */}
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
