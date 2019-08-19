import axios from 'axios';
import {LOGIN, REGISTER, GET_USER, LOGOUT} from './actionTypes';

const intialState = {
    user: {},
    redirect: false,
    error: false
}

export const login = (email, password) => {
    let data = axios
    .post('/api/login', {email, password})
    .then(req => res.data);
    return {
        type: LOGIN, 
        payload: data
    };
};

export const register = (name, email, password) => {
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


export default function(state = intialState) {
    let {type, payload} = action;
    switch(type) {
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
    }
}

