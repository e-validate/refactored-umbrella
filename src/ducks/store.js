import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import sessionReducer from './reducers/sessionReducer';
import profileReducer from "./reducers/profileReducer";
import swipeReducer from './reducers/swipeReducer';
import formReducer from './reducers/formReducer';


const rootReducer = combineReducers({
  user: userReducer,
  messages: messageReducer,
  session: sessionReducer,
  profiles: profileReducer,
  swipe: swipeReducer,
  form: formReducer
})

// standard export, comment back in before hosting
// export default createStore(rootReducer, applyMiddleware(promiseMiddleware))

// export for redux dev tools, comment back out before hosting
export default createStore(
  rootReducer,

    applyMiddleware(promiseMiddleware)
);
