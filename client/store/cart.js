import axios from 'axios'
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
// {
//   maskId1: quantity,
//   maskId2: quantity
// }

/**
 ARCHANA: following code will be required for making cart persistent within session for the GUEST users
 */
// const initialCart = {}
const initialCart = localStorage.getItem('localCart')
  ? JSON.parse(localStorage.getItem('localCart'))
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

const updateCartQty = (maskId, quantity) => ({
  type: UPDATE_CART,
  maskId,
  quantity
})

const removeFromCart = maskId => ({
  type: REMOVE_FROM_CART,
  maskId
})

export const resetCart = () => ({type: RESET_CART})

/**
 * THUNK CREATORS
 */
export const fetchCart = () => async (dispatch, getState) => {
  try {
    const {user} = getState()
    /**
     *  ARCHANA: have commented out following if condition check for user.id because navbar is not set properly and hence there is no way of testing it
     * Once we have navbar working fine, we need to make sure logged in user check is incorporated.
     */

    if (user.id) {
      const {data: cart} = await axios.get('/api/cart')
      dispatch(setCart(cart))
    }
  } catch (err) {
    console.error(err)
  }
}

export const addMaskToCart = (maskId, quantity, price) => async (
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
    dispatch(addToCart(maskId, quantity, price))
  } catch (err) {
    console.error('Could not add to cart!')
    console.log(err)
  }
}

export const updateCart = (maskId, quantity) => async (dispatch, getState) => {
  try {
    const {user} = getState()
    if (user.id) {
      await axios.put(`/api/cart/${maskId}`, {
        quantity
      })
    }
    dispatch(updateCartQty(maskId, quantity))
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

/**
 * REDUCER
 */
export default function(state = initialCart, action) {
  switch (action.type) {
    case SET_CART: {
      // return {...state, ...action.cart}
      return action.cart
    }
    case ADD_TO_CART: {
      const currentCart = {...state}
      if (currentCart[action.maskId]) {
        let previousQty = currentCart[action.maskId]
        currentCart[action.maskId] = previousQty + action.quantity
      } else {
        currentCart[action.maskId] = action.quantity
      }
      return {...currentCart}
    }
    case UPDATE_CART: {
      const currentCart = {...state}
      currentCart[action.maskId] = action.quantity
      return {...currentCart}
    }
    case REMOVE_FROM_CART: {
      const currentCart = {...state}
      delete currentCart[action.maskId]
      return {...currentCart}
    }
    case RESET_CART: {
      localStorage.setItem('localCart', JSON.stringify({}))
      return {}
    }
    default:
      return state
  }
}
