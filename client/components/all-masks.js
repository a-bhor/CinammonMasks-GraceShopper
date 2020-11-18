import React from 'react'
import {connect} from 'react-redux'
import {getMasks} from '../store/all-masks'
import Grid from '@material-ui/core/Grid'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {addMaskToCart} from '../store/cart'

class AllMasks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.addToCart = this.addToCart.bind(this)
  }

  addToCart(maskId, quantity, price) {
    try {
      this.props.addToCart(maskId, quantity, price)
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.props.fetchMasks()
    this.props.loadCart()
  }

  render() {
    const {masks} = this.props
    let {quantity} = this.state

    return (
      <div className="allMasksContainer">
        <Grid container spacing={2}>
          {masks.map(mask => (
            <Grid item xs={4} key={mask.id}>
              <Link to={`/masks/${mask.id}`}>
                <img
                  className="singleMaskPreviewImg"
                  src={mask.imageUrl}
                  alt="single mask preview"
                />
                <div className="maskNamePrice">
                  <h4>{mask.name}</h4>
                  <h5>${mask.price.toFixed(2)}</h5>
                </div>
              </Link>
              <div className="add-masks-cart">
                <Button
                  variant="outlined"
                  color="secondary"
                  type="onSubmit"
                  onClick={() => this.addToCart(mask.id, quantity, mask.price)}
                  className="addToCartBtn"
                  style={{
                    maxWidth: '105px',
                    maxHeight: '40px',
                    fontSize: '10px'
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

const mapState = state => ({
  masks: state.allMasks
})

const mapDispatch = dispatch => ({
  fetchMasks: () => dispatch(getMasks()),
  loadCart: () => dispatch(fetchCart()),
  addToCart: (maskId, quantity, price) =>
    dispatch(addMaskToCart(maskId, quantity, price))
})

export default connect(mapState, mapDispatch)(AllMasks)
