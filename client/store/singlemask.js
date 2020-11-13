import axios from 'axios'

const GET_SINGLE_MASK = 'GET_SINGLE_MASK'

export const getSingleMask = mask => ({
  type: GET_SINGLE_MASK,
  mask
})

export const fetchSingleMask = maskId => async dispatch => {
  try {
    const {data: mask} = await axios.get(`api/masks/${maskId}`)
    dispatch(getSingleMask(mask))
  } catch (error) {
    console.error('Error fetching mask!')
    console.error(error)
  }
}

const initialState = {
  mask: {}
}

export default function maskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_MASK:
      return {...state, mask: action.mask}
    default:
      return state
  }
}
