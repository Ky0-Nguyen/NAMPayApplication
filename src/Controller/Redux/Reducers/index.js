import * as Reducers from './reducers'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  ...Reducers
})

export default rootReducer
