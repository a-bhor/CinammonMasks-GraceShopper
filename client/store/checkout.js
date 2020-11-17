import axios from 'axios'

const SET_CHECKOUT = 'SET_CHECKOUT'

const setCheckout = address => ({
  type: SET_CHECKOUT,
  address
})

export const postCheckout = address => async dispatch => {
  try {
    console.log(address)
    let {data: order} = await axios.post('/api/checkout', address)
    dispatch(setCheckout(order))
  } catch (error) {
    next(error)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    default:
      return {...state}
  }
}
