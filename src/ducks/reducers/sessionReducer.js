import axios from 'axios';
import {LOGIN, REGISTER, GET_USER, LOGOUT, GET_USER_DETAILS} from './actionTypes';

const initialState = {
    user: {},
    redirect: false,
    error: false,
    details: []
}

export const login = (email, password) => {
    let data = axios
    .post('/api/login', {email, password})
    .then(res => res.data);
    return {
        type: LOGIN, 
        payload: data
    };
};

export const getDetails = (id) => {
    let data = axios
    .get(`/api/user/details/${id}`)
    .then(res => res.data)
    return { 
        type: GET_USER_DETAILS,
        payload: data
    }
}

export const register = (name, email, password) => {
    console.log(name, email, password);
    let data = axios
    .post('/api/register', {name, email, password})
    .then(res => res.data);
    return {
        type: REGISTER,
        payload: data
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload: axios.delete('/api/logout')
    };
};

export const getUser = () => {
    let data = axios.get('/api/user').then(res => res.data);
    return {
        type: GET_USER,
        payload: data
    };
};


export default function sessionReducer(state = initialState, action) {
    let {type, payload} = action;
    switch(type) {
        case GET_USER_DETAILS + '_FULFILLED': 
            return{
                ...state, 
                error: false,
                redirect: false,
                details: payload
            }
        case GET_USER_DETAILS + "_REJECTED" :
            return{
                ...state,
                error: payload
            }
        case LOGIN + '_FULFILLED':
        return {
            ...state,
            user: payload,
            redirect: false,
            error: false
        };
        case LOGIN + '_REJECTED':
        return {
            ...state,
            error: payload
        };
        case REGISTER + '_FULFILLED':
        return {
            ...state,
            user: payload,
            error: false,
            redirect: true
        };
        case REGISTER + '_REJECTED':
        return {
            ...state,
            error: payload
        };
        case LOGOUT + '_FULFILLED':
        return {
            ...state,
            user: {},
            redirect: true,
            error: false
        };
        case GET_USER + '_FULFILLED':
        return {
            ...state, 
            error: false,
            user: payload
        };
        case GET_USER + '_REJECTED':
        return {
            ...state, 
            error: payload,
            redirect: true
        };
        default:
        return state
    }
}

