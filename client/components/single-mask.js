import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {fetchSingleMask} from '../store/singlemask'
import {addedToCart} from '../store/cart'

class SingleMask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
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
    const quantity = Number(evt.target.value)
    this.setState({quantity})
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
          width="300"
          height="400"
        />
        <h2>{singleMask.name}</h2>
        <p>{singleMask.description}</p>
        <p>${Number(singleMask.price).toFixed(2)}</p>
        <div className="btn-group">
          <form>
            <p>QTY</p>
            <TextField
              id="standard-number"
              type="number"
              size="small"
              InputProps={{
                inputProps: {
                  max: 100,
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
  singleMask: state.singleMask,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  loadSingleMask: maskId => dispatch(fetchSingleMask(maskId)),
  addToCart: (maskId, quantity, price) =>
    dispatch(addedToCart(maskId, quantity, price))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleMask)
