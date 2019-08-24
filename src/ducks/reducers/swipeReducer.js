import axios from 'axios'
import {SWIPE_LEFT, SWIPE_RIGHT, SET_CHAT_ROOM} from './actionTypes'

const initialState = {
  chatRoom: null
}

export function setChatRoom (){
  console.log("setchathit")
  return{
    paylod: null,
    type: SET_CHAT_ROOM
  }
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
      return{state, chatRoom: payload}  
    case SWIPE_LEFT + "_FULFILLED" : 
      return{state} 
    case SET_CHAT_ROOM + "_FULFILLED" :
      return{...state, chatRoom: payload} 
    default: 
      return state  
  }
}