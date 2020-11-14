import React from 'react'
import {connect} from 'react-redux'
import {getMasks} from '../store/all-masks'
import Grid from '@material-ui/core/Grid'
import {fetchCart} from '../store/cart'

class AllMasks extends React.Component {
  constructor(props) {
    super(props)
    this.viewSingleMask = this.viewSingleMask.bind(this)
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

  viewSingleMask(id) {
    //redirect to /masks/:maskId
    this.props.history.push(`masks/${id}`)
  }

  render() {
    const {masks} = this.props

    return (
      <div className="allMasksContainter">
        {/* {masks.map((mask) => (
          <div
            className="SingleMaskPreview"
            onClick={() => viewSingleMask(mask.id)}
          >
            <img
              className="SingleMaskPreviewImg"
              src={mask.imageUrl}
              alt="single mask preview"
            />
            <div className="mask-description">
              <h4>{mask.name}</h4>
              <h5>{mask.style}</h5>
              <h5>{mask.price}</h5>
            </div>
          </div>
        )} */}
        <Grid container spacing={1} className="allMasksContainer">
          {masks.map(mask => (
            <Grid item xs={4} key={mask.id}>
              <div onClick={() => this.viewSingleMask(mask.id)}>
                <img
                  className="singleMaskPreviewImg"
                  src={mask.imageUrl}
                  alt="single mask preview"
                />
                <h4>name: {mask.name}</h4>
                <h5>style: {mask.style}</h5>
                <h5>{mask.price}</h5>
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
  loadCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(AllMasks)
