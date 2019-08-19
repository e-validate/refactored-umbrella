import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import sessionReducer from './reducers/sessionReducer';


const rootReducer = combineReducers({
  user: userReducer,
  messages: messageReducer,
  session: sessionReducer
})

// standard export, comment back in before hosting
// export default createStore(rootReducer, applyMiddleware(promiseMiddleware))

// export for redux dev tools, comment back out before hosting
export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(promiseMiddleware)))
