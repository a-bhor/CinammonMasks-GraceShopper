import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {fetchSingleMask} from '../store/singlemask'

class SingleMask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.addMask = this.addMask.bind(this)
    this.subtractMask = this.subtractMask.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    try {
      this.props.loadSingleMask(this.props.match.params.maskId)
    } catch (error) {
      console.log(error)
    }
  }

  addMask() {
    let qty = this.state.quantity
    try {
      this.setState({quantity: qty++})
    } catch (error) {
      console.log(error)
    }
  }

  subtractMask() {
    let qty = this.state.quantity
    try {
      this.setState({quantity: qty--})
    } catch (error) {
      console.log(error)
    }
  }

  addToCart() {
    try {
      let maskId = this.props.match.params.maskId
      let userId = this.props.match.params.userId
      let qty = this.state.quantity
      // will add addToCart
      // this.props.addToCart(maskId, userId, qty)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {singleMask} = this.props.singleMask
    // console.log('INSIDE SINGLE MASK RENDER! -->', this.props.singleMask)
    // need to figure out which button we're using for the quantity
    // const { quantity } = this.state

    return (
      <div className="maskContainer">
        <img className="singleMaskImg" src={singleMask.imageUrl} />
        <h2>{singleMask.name}</h2>
        <p>{singleMask.description}</p>
        <p>{singleMask.price}</p>
        <div className="btn-group">
          <p>QTY</p>
          <button type="button" onClick={this.addMask} className="addMask">
            +
          </button>
          <button
            type="button"
            onClick={this.subtractMask}
            className="subtractMask"
          >
            -
          </button>
          <form>
            <TextField
              id="standard-number"
              label="Number"
              type="number"
              InputLabelProps={{shrink: true}}
            />
          </form>
        </div>
        <Button
          variant="outlined"
          color="secondary"
          type="onSubmit"
          onClick={this.addToCart}
          className="addToCart"
        >
          Add to cart
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleMask: state.singleMask
})

const mapDispatchToProps = dispatch => ({
  loadSingleMask: id => dispatch(fetchSingleMask(id))

  // waiting on addToCart functionality
  // addToCart: (id, userId, quantity) => dispatch(addToCart(id, userId, quantity))

})

export default connect(mapStateToProps, mapDispatchToProps)(SingleMask)
