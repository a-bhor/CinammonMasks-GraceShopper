import axios from 'axios'

const GET_SINGLE_MASK = 'GET_SINGLE_MASK'

export const getSingleMask = singleMask => ({
  type: GET_SINGLE_MASK,
  singleMask
})

export const fetchSingleMask = maskId => async dispatch => {
  try {
    const mask = await axios.get(`api/masks/${maskId}`)
    dispatch(getSingleMask(mask))
    console.log(mask)
  } catch (error) {
    console.error('Error fetching mask!')
    console.error(error)
  }
}

const initialState = {
  singleMask: {}
}

export default function maskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_MASK:
      return {...state, singleMask: action.singleMask}
    default:
      return state
  }
}
