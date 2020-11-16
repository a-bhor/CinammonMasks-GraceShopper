import axios from 'axios'
import {noExtendLeft} from 'sequelize/types/lib/operators'
// import history from '../history'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
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

const addToCart = (maskId, quantity, price) => ({
  type: ADD_TO_CART,
  maskId,
  quantity,
  price
})

const updateCartQty = (maskId, quantity, price) => ({
  type: UPDATE_CART,
  maskId,
  quantity,
  price
})

const removeFromCart = (maskId, quantity) => ({
  type: REMOVE_FROM_CART,
  maskId,
  quantity
})

const resetCart = cart => ({type: RESET_CART, cart})

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

// pull user from getState()
export const addedToCart = (maskId, quantity, price) => async (
  dispatch,
  getState
) => {
  try {
    const {user} = getState()
    if (user.id) {
      await axios.post(`/api/cart/${maskId}`, {
        quantity,
        price
      })
    }
    dispatch(addToCart(maskId, quantity))
  } catch (err) {
    console.error('Could not add to cart!')
    console.log(err)
  }
}

export const updateCart = (maskId, quantity, price) => async (
  dispatch,
  getState
) => {
  try {
    const {user} = getState()
    if (user.id) {
      await axios.put(`/api/cart/${maskId}`, {
        quantity
      })
    }
    dispatch(updateCartQty(maskId, quantity, price))
  } catch (err) {
    console.error('Could not update cart!')
    console.log(err)
  }
}

export const deleteFromCart = maskId => async (dispatch, getState) => {
  try {
    const {user} = getState()
    if (user.id) {
      await axios.delete(`/api/cart/${maskId}`)
    }
    dispatch(removeFromCart(maskId))
  } catch (err) {
    console.error('Could not delete mask from cart!')
    console.log(err)
  }
}

export const deleteCart = cart => async (dispatch, getState) => {
  try {
    const {user} = getState()
    if (user.id) {
      // delete entire order
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialCart, action) {
  switch (action.type) {
    case SET_CART:
      console.log('inside reducer, initialCart is : ', state)
      return {...state, ...action.cart}

    case ADD_TO_CART:
      let currentCart = {...state}
      if (currentCart[action.maskId]) {
        let previousQty = currentCart[action.maskId]
        currentCart[action.maskId] = previousQty + action.quantity
      } else {
        currentCart[action.maskId] = action.quantity
      }
      return {...currentCart}

    case UPDATE_CART:
      currentCart = {...state}
      if (currentCart[action.maskId]) {
        currentCart[action.maskId] = action.quantity
        currentCart[action.price] = action.quantity * action.price
      }
      return {...currentCart}

    case REMOVE_FROM_CART:
      currentCart = {...state}
      if (currentCart[action.maskId]) {
        if (action.quantity === 0) {
          delete currentCart[action.maskId]
        }
      }
      return {...currentCart}

    case RESET_CART:
      currentCart = {...state}
      currentCart = {}
      return {...currentCart}

    default:
      return state
  }
}
