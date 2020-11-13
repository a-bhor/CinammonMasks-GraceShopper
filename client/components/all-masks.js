import React from 'react'
import {connect} from 'react-redux'
import {getMasks} from '../store/all-masks'

class AllMasks extends React.Component {
  constructor(props) {
    super(props)
    this.viewSingleMask = this.viewSingleMask.bind(this)
  }

  componentDidMount() {
    this.props.fetchMasks()
  }

  viewSingleMask(id) {
    //redirect to /masks/:maskId
    console.log('THIS.PROPS >>', this.props)
    this.props.history.push(`masks/${id}`)
  }

  render() {
    const {masks} = this.props
    console.log('MASKS >>> ', masks)
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
        {masks.map(mask => (
          <div key={mask.id} onClick={this.viewSingleMask(mask.id)}>
            <img
              className="SingleMaskPreviewImg"
              src={mask.imageUrl}
              alt="single mask preview"
            />
            <h4>{mask.name}</h4>
            <h5>{mask.style}</h5>
            <h5>{mask.price}</h5>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  masks: state.masks
})

const mapDispatch = dispatch => ({
  fetchMasks: () => dispatch(getMasks())
})

export default connect(mapState, mapDispatch)(AllMasks)
