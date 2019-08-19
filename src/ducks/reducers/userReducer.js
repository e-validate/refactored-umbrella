import axios from 'axios'
import {GET_POTENTIAL_MATCHES} from './actionTypes'

const initialState = {
  potentialMatches: [],
  error: false
}

export function getPotentialMatches(){
  let data = axios.get('/api/users/potential')
  .then(res => {console.log('aaron', res.data)
    return res.data})
    console.log("aaron")
  return {
    type: GET_POTENTIAL_MATCHES,
    payload: data
    
  }
}


export default function userReducer(state = initialState, action){
  console.log("action", action)
  let {type, payload} = action
  switch(type){
    case GET_POTENTIAL_MATCHES + "_FULFILLED" : 
      return{...state, potentialMatches: payload}
    default: 
      return state
  }
}