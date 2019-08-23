import axios from 'axios'
import {SWIPE_LEFT, SWIPE_RIGHT} from './actionTypes'

const initialState = {
  chatRoom: 0
}

export function swipeRight(id){
  let data = axios.post(`/api/swipe/right/${id}`).then(res => res.data)
  return{
    type: SWIPE_RIGHT, 
    payload: data
  }
}

export function swipeLeft(id){
let data = axios.post(`/api/swipe/left/${id}`)
return{
  type: SWIPE_LEFT,
  payload: data
}
}


export default function swipeReducer (state = initialState, action){
  let {type, payload} = action
  switch(type){
    case SWIPE_RIGHT + '_FULFILLED': 
      return{...state}  
    case SWIPE_LEFT + "_FULFILLED" : 
      return{...state} 
    default: 
      return state  
  }
}