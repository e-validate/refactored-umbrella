import axios from 'axios'
import {SWIPE_LEFT, SWIPE_RIGHT} from './actionTypes'

const initialState = {
  chatRoom: 0
}

export function swipeRight(id){
  console.log('swipeRight')
  console.log(id)
  let data = axios.post(`/api/swipe/right/${id}`).then(res => {
   console.log("res.data", res.data)
    return res.data
  })
  return{
    type: SWIPE_RIGHT, 
    payload: data
  }
  
}

export function swipeLeft(id){
console.log("Swipleft")
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
      return{...state, chatRoom: payload}  
    case SWIPE_LEFT + "_FULFILLED" : 
      return{...state} 
    default: 
      return state  
  }
}