import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {fetchSingleMask} from '../store/singlemask'
import {addMaskToCart} from '../store/cart'
import Input from '@material-ui/core/Input'

class SingleMask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
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
    if (evt.target.value > 0) {
      const quantity = Number(evt.target.value)

      this.setState({quantity})
      console.log(this.state.quantity)
    } else {
      this.setState({quantity: 0})
    }
  }

  addToCart() {
    try {
      let {maskId} = this.props.match.params
      let {quantity} = this.state
      let {price} = this.props.singleMask
      this.props.addToCart(maskId, quantity, price)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {handleChange} = this
    const {singleMask} = this.props

    return (
      <div className="maskContainer">
        <img
          className="singleMaskImg"
          src={singleMask.imageUrl}
          width="350"
          height="450"
        />
        <div className="maskInfo">
          <h2>{singleMask.name}</h2>
          <p>{singleMask.description}</p>
          <p>${Number(singleMask.price).toFixed(2)}</p>
          <div className="btn-group">
            <form className="qtyForCart">
              <p>QTY</p>
              <TextField
                id="standard-number"
                type="number"
                size="small"
                helperText={this.state.errorText}
                defaultValue="1"
                InputProps={{
                  inputMode: 'numeric',
                  inputProps: {
                    max: 100,
                    min: 1
                  }
                }}
                onChange={handleChange}
                InputLabelProps={{shrink: true}}
              />
            </form>
          </div>
          <div className="addToCartBtn">
            <Button
              variant="outlined"
              color="secondary"
              type="onSubmit"
              disabled={!(this.state.quantity > 0)}
              onClick={this.addToCart}
              className="addToCartBtn"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleMask: state.singleMask,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  loadSingleMask: maskId => dispatch(fetchSingleMask(maskId)),
  addToCart: (maskId, quantity, price) =>
    dispatch(addMaskToCart(maskId, quantity, price))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleMask)
