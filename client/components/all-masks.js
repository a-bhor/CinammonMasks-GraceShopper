import React from 'react'
import {connect} from 'react-redux'
import {getMasks} from '../store/all-masks'
import {Link} from 'react-router-dom'

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
        {masks.map(mask => (
          <div key={mask.id} onClick={() => this.viewSingleMask(mask.id)}>
            <img
              className="SingleMaskPreviewImg"
              src={mask.imageUrl}
              alt="single mask preview"
            />

            <h4>name: {mask.name}</h4>
            <h5>style: {mask.style}</h5>
            <h5>{mask.price}</h5>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  masks: state.allMasks
})

const mapDispatch = dispatch => ({
  fetchMasks: () => dispatch(getMasks())
})

export default connect(mapState, mapDispatch)(AllMasks)
