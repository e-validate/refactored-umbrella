import axios from 'axios'

const initialState = {
  messages: []
}

export default function messageReducer(state = initialState, action){
  let {type, payload} = action
  switch(type) {
    default:
      return state
  }
}