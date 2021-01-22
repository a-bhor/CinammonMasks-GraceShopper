import axios from 'axios'

// action constants
const SET_SINGLE_MASK = 'SET_SINGLE_MASK'

export const setSingleMask = singleMask => ({
  type: SET_SINGLE_MASK,
  singleMask
})

// thunk creators
export const fetchSingleMask = maskId => async dispatch => {
  try {
    const {data: singleMask} = await axios.get(`/api/masks/${maskId}`)
    dispatch(setSingleMask(singleMask))
  } catch (error) {
    console.error('Error fetching mask!')
    console.error(error)
  }
}

const initialState = {}

export default function maskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_MASK:
      return {...state, ...action.singleMask}
    default:
      return state
  }
}
