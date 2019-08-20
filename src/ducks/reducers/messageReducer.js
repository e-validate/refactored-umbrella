import axios from 'axios'

const initialState = {
  messages: []
}

export const SAVE_MESSAGE = 'SAVE_MESSAGE'

export const saveMessage = (chatroom_id, content) => {
  let data = axios.post('/api/savemessage', {
    chatroom_id, content
  })
  .then(res => { console.log(res.data)
    return res.data})
  return {
    type: SAVE_MESSAGE,
    payload: data
  }
}

export default function messageReducer(state = initialState, action){
  let {type, payload} = action
  switch(type) {
    case SAVE_MESSAGE + '_FULFILLED':
    return {...state , messages: payload}
    default:
      return state
  }
}