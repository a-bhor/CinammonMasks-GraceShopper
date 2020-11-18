import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allMasks from './all-masks'
import singleMask from './singlemask'
import cart from './cart'

const reducer = combineReducers({user, singleMask, allMasks, cart})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

store.subscribe(() => {
  if (!store.getState().user.id) {
    localStorage.setItem('localCart', JSON.stringify(store.getState().cart))
  }
})

export default store
export * from './user'
export * from './all-masks'
export * from './singlemask'
export * from './cart'
