import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const RESET_CART = 'RESET_CART'

/**
 * INITIAL STATE
 */
// ARCHANA:
// Our cart (when filled) would look something like this:
//
// [
//   {mask1 details (it will include ALL the details of give mask from masks table), mask1.order-detail(it will have order id, quantity, price etc)}
//   {mask2 details , mask2.order-detail}
//   and so on
// ]

/**
 ARCHANA: following code will be required for making cart persistent within session for the GUEST users
 */
const initialCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {}

/**
 * ACTION CREATORS
 */
const setCart = cart => ({type: SET_CART, cart})
// const addToCart =

/**
 * THUNK CREATORS
 */
export const fetchCart = () => async (dispatch, getState) => {
  try {
    const {user} = getState()
    // console.log('inside fetchCart thunk, User is: ', user)

    /**
     *  ARCHANA: have commented out following if condition check for user.id because navbar is not set properly and hence there is no way of testing it
     * Once we have navbar working fine, we need to make sure logged in user check is incorporated.
     */
    // if (user.id) {
    const {data: cart} = await axios.get('/api/cart')
    // }
    // console.log('fetched cart : ', cart)

    dispatch(setCart(cart))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialCart, action) {
  switch (action.type) {
    case SET_CART:
      console.log('inside reducer, initialCart is : ', state)
      return {...action.cart}
    default:
      return state
  }
}
