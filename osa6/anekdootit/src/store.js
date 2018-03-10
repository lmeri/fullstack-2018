import { createStore, combineReducers, applyMiddleware } from 'redux'
import areducer from './reducers/anecdoteReducer'
import nreducer from './reducers/notificationReducer'
import freducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  anecdotes: areducer,
  notifications: nreducer,
  filter: freducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store