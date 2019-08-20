import axios from "axios";

export const GET_CURRENT_USER = "GET_CURRENT_USER";

const initialState = {
  profiles: [],
  error: false
};

export function getCurrentUser(id) {
  let data = axios.get(`/api/profiles/${id}`).then(res => res.data);
  return {
    type: GET_CURRENT_USER,
    payload: data
  };
}

export default function profileReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case GET_CURRENT_USER + "_FULFILLED":
      return { ...state, profiles: payload };
    case GET_CURRENT_USER + "_PENDING":
      return { ...state, profiles: payload };
    case GET_CURRENT_USER + "_REJECTED":
      return { ...state, error: payload };
    default:
      return state;
  }
}
