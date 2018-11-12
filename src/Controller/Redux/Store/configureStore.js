'use strict'

import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from '../Reducers'

const middleWare = [thunkMiddleware]
if (process.env['NODE_ENV'] === 'development') {
  middleWare.push(logger)
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleWare)
)

export default store
