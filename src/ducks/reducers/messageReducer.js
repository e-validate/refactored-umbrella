import axios from "axios";

const initialState = {
  messages: [],
  error: false,
  chatrooms: [],
  chatroomCount: []
};

export const SAVE_MESSAGE = "SAVE_MESSAGE";
export const GET_CHATROOM_MESSAGES = "GET_CHATROOM_MESSAGES";
export const GET_USERS_CHATROOMS = "GET_USERS_CHATROOMS";
export const GET_MESSAGE_COUNT = "GET_MESSAGE_COUNT";
export const SWITCH_TO_READ = "SWITCH_TO_READ";

export const saveMessage = (chatroom_id, content) => {
  let data = axios.post("/api/savemessage", {
    chatroom_id,
    content
  }).then(res => {
    return res.data;
  });
  return {
    type: SAVE_MESSAGE,
    payload: data
  };
};

export const getChatroomMessages = chatroom_id => {
  let data = axios.get(`/api/messages/${chatroom_id}`).then(res => {
    console.log('results from controller axios call getting messages',res.data);
    return res.data});
  return {
    type: GET_CHATROOM_MESSAGES,
    payload: data
  };
};

export const getUnreadMessages = chatroom_id => {
  let data = axios
    .get(`/api/unread/messages/${chatroom_id}`)
    .then(res => res.data);
  return {
    type: GET_MESSAGE_COUNT,
    payload: data
  };
};

export const getUsersChatrooms = () => {
  console.log('hittt guc');
  let data = axios.get(`/api/matches`).then(res => {
    console.log('results from controller axios call getting chatrooms',res.data);
    return res.data});
  return {
    type: GET_USERS_CHATROOMS,
    payload: data
  };
};

export default function messageReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case SAVE_MESSAGE + "_FULFILLED":
      return { ...state, messages: payload };
    case SAVE_MESSAGE + "_REJECTED":
      return { ...state, error: payload };
    case GET_CHATROOM_MESSAGES + "_FULFILLED":
      return { ...state, messages: payload };
    case GET_CHATROOM_MESSAGES + "_REJECTED":
      return { ...state, error: payload };
    case GET_MESSAGE_COUNT + "_FULFILLED":
      return { ...state, chatroomCount: payload };
    case GET_MESSAGE_COUNT + "_REJECTED":
      return { ...state, error: payload };
    case GET_USERS_CHATROOMS + "_FULFILLED":
      return { ...state, chatrooms: payload };
    case GET_USERS_CHATROOMS + "_REJECTED":
      return { ...state, error: payload };
    default:
      return state;
  }
}
