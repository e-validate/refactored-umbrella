import axios from 'axios'
import {GET_POTENTIAL_MATCHES} from './actionTypes'

const initialState = {
  potentialMatches: [],
  error: false
}

export function getPotentialMatches(){
  console.log('before axios call')
  let data = axios.get(`/api/users/potential`)
  .then(res => res.data)
  console.log('data', data)
  return {
    type: GET_POTENTIAL_MATCHES,
    payload: data
  }
}


export default function userReducer(state = initialState, action){
  let {type, payload} = action
  switch(type){
    case GET_POTENTIAL_MATCHES + "_FULFILLED" : 
      return{...state, potentialMatches: payload}
    case GET_POTENTIAL_MATCHES + "_REJECTED" : 
      return{...state, error: true}  
    default: 
      return state
  }
}