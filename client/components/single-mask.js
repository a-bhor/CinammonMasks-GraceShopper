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
    // this.addMask = this.addMask.bind(this)
    // this.subtractMask = this.subtractMask.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    try {
      this.props.loadSingleMask(this.props.match.params.maskId)
    } catch (error) {
      console.log(error)
    }
  }

  handleChange(evt) {
    const quantity = Number(evt.target.value)
    this.setState({quantity})
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
    const {handleChange} = this
    const {singleMask} = this.props.singleMask
    // console.log('INSIDE SINGLE MASK RENDER! -->', this.props.singleMask)
    // need to figure out which button we're using for the quantity
    const {quantity} = this.state

    return (
      <div className="maskContainer">
        <img
          className="singleMaskImg"
          src={singleMask.imageUrl}
          width="500"
          height="600"
        />
        <h2>{singleMask.name}</h2>
        <p>{singleMask.description}</p>
        <p>{singleMask.price}</p>
        <div className="btn-group">
          <p>QTY</p>
          <p>{quantity}</p>

          <input type="number" onChange={handleChange} min="0" max="10" />

          <form>
            <TextField
              id="standard-number"
              label="Number"
              type="number"
              size="small"
              InputProps={{
                inputProps: {
                  max: 10,
                  min: 0
                }
              }}
              onChange={handleChange}
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
