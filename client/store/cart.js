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
  : []

/**
 * ACTION CREATORS
 */
const setCart = cart => ({type: SET_CART, cart})

const addToCart = cart => ({type: ADD_TO_CART, cart})

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

export const updateCart = (singleMask, userId, quantity) => async (
  dispatch,
  getState
) => {
  try {
    if (userId === null) {
      // get the cart
      const {cart} = getState()
      // check if cart is empty
      if (cart.length < 1) {
        // if it is empty, add singlemask and dispatch to change state
        cart.push(singleMask)
        dispatch(addToCart(cart))
      } else {
        // if the cart has items
        // check if mask has already been added
        for (let mask of cart) {
          if (mask.id === singleMask.id) {
            // need to change order-detail syntax
            // if it has, change the quantity
            mask.orderdetail.quantity += quantity
            // dispatch cart to change state
            dispatch(addToCart(cart))
          } else {
            // if the mask hasn't been added yet, add mask
            cart.push(singleMask)
            dispatch(addToCart(cart))
          }
        }
      }
    }

    // BUGS:
    // if (userId !== null) {
    //   const {cart} = getState()
    //   console.log(cart)
    // //   if (cart.length < 1) {
    // //     const {data: newCart} = await axios.post('/api/cart', singleMask, {
    // //       userId,
    // //       quantity
    // //     })
    // //     dispatch(addToCart(newCart))
    // //   } else {
    // //     const {data: updatedCart} = await axios.put('/api/cart', {
    // //       singleMask,
    // //       userId,
    // //       quantity
    // //     })
    // //     // console.log('HELLO!!!', updatedCart)
    // //     dispatch(addToCart(updatedCart))
    // //   }
    // // }
  } catch (error) {
    console.error('Could not update cart!')
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
      return [...action.cart]
    case ADD_TO_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
