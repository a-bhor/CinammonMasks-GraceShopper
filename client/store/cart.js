import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const RESET_CART = 'RESET_CART'

/**
 * INITIAL STATE
 */
// ARCHANA:
// Our cart (when filled) would look something like this:
// {
//     orderId

// }
const initialCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {}

/**
 * ACTION CREATORS
 */
// const getCart = (cart) => ({type: GET_CART, cart})
// const addToCart =

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
