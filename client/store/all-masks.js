import axios from 'axios'

//acion constants
const SET_MASKS = 'SET_MASKS'

//action creators
const setMasks = masks => ({
  type: SET_MASKS,
  masks
})

//thunk creators
export const getMasks = () => async dispatch => {
  try {
    const {data: masks} = await axios.get('/api/masks')
    dispatch(setMasks(masks))
  } catch (error) {
    console.error('ERROR getting masks \n', error)
  }
}

const initialState = []

//const allMasksReducer

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MASKS:
      return action.masks
    default:
      return state
  }
}
