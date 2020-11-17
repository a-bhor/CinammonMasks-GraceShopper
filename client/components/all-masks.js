import React from 'react'
import {connect} from 'react-redux'
import {getMasks} from '../store/all-masks'
import Grid from '@material-ui/core/Grid'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'

class AllMasks extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchMasks()
    /**
     * ARCHANA: Review placemen of loadCart().
     * We may or may not have to load the cart in AllMasks
     */
    // console.log('Calling the fetchCart to test')
    this.props.loadCart()
    // console.log('cart loaded')
  }

  render() {
    const {masks} = this.props

    return (
      <div className="allMasksContainter">
        <Grid
          container
          spacing={2}
          justify="center"
          className="allMasksContainer"
        >
          {masks.map(mask => (
            <Grid item xs={4} key={mask.id}>
              <Link to={`/masks/${mask.id}`}>
                <img
                  className="singleMaskPreviewImg"
                  src={mask.imageUrl}
                  alt="single mask preview"
                />

                <h4>{mask.name}</h4>
                <h5>{mask.style}</h5>
                <h5>${mask.price.toFixed(2)}</h5>
              </Link>
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
  loadCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(AllMasks)
