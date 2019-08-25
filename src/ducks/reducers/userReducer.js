import axios from 'axios'
import {GET_POTENTIAL_MATCHES, SET_LOCATION} from './actionTypes'

const initialState = {
  potentialMatches: [],
  error: false
}

export function getPotentialMatches(){
  let data = axios.get(`/api/users/potential`)
  .then(res => res.data)
  return {
    type: GET_POTENTIAL_MATCHES,
    payload: data
  }
}

export function setLocation(latitude, longitude){
  let data = axios.post('/api/location/set', {latitude, longitude})
  .then(res => res.data)
  return{
    type: SET_LOCATION,
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