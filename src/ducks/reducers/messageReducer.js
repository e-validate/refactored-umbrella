import axios from "axios";

const initialState = {
  messages: [],
  error: false
};

export const SAVE_MESSAGE = "SAVE_MESSAGE";
export const GET_CHATROOM_MESSAGES = "GET_CHATROOM_MESSAGES";

export const saveMessage = (chatroom_id, content) => {
  let data = axios
    .post("/api/savemessage", {
      chatroom_id,
      content
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    });
  return {
    type: SAVE_MESSAGE,
    payload: data
  };
};

export const getChatroomMessages = chatroom_id => {
  let data = axios 
  .get(`/api/messages/${chatroom_id}`)
  .then(res=>{
    console.log(res.data)
  })
  return {
    type: GET_CHATROOM_MESSAGES,
    payload: data
  }
};

export default function messageReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case SAVE_MESSAGE + "_FULFILLED":
      return { ...state, messages: payload };
    case SAVE_MESSAGE + "_REJECTED":
      return { ...state, error: payload };
      case GET_CHATROOM_MESSAGES + "_FULFILLED":
        return {...state, messages:payload}
      case GET_CHATROOM_MESSAGES + "_REJECTED":
        return {...state, error: payload}
    default:
      return state;
  }
}
