import axios from 'axios'
import {GET_ALL_USERS} from '../actionTypes'

const initialState = {
  allUsers: [],
  error: false
}

export const getAllUsers(){
  return{
    type: GET_ALL_USERS,
    payload: axios.get(`/api/users/all`).then(res => res.data)
  }
}


export default function(state = initialState, action) {
  let {type, payload} = action
  switch (type) {
    case GET_ALL_USERS + "_FULFILLED" :
      return{...state, allUsers: payload, error: false }
    case GET_ALL_USERS + "_REJECTED" :
      return{...state, error: payload}  
  }
}