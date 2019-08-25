import axios from "axios";
import { SWIPE_LEFT, SWIPE_RIGHT, SET_CHAT_ROOM } from "./actionTypes";

const initialState = {
  chatRoom: 0
};

export function setChatRoom() {
  let data = 0;
  return {
    payload: data,
    type: SET_CHAT_ROOM
  };
}

export function swipeRight(id) {
  let data = axios.post(`/api/swipe/right/${id}`).then(res => {
    if (!res.data[0] ) {
      return (data = 0);
    } else {
      return res.data[0].chatroom_id;
    }
  });
  return {
    type: SWIPE_RIGHT,
    payload: data
  };
}

export function swipeLeft(id) {
  let data = axios.post(`/api/swipe/left/${id}`).then(res => res.data);
  return {
    type: SWIPE_LEFT,
    payload: data
  };
}

export default function swipeReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case SWIPE_RIGHT + "_FULFILLED":
      return { ...state, chatRoom: payload };
    case SWIPE_LEFT + "_FULFILLED":
      return { ...state };
    case SET_CHAT_ROOM :
      return { ...state, chatRoom: payload };
    default:
      return state;
  }
}
