import axios from 'axios';
import { ADD_USER_APPEARANCE, ADD_USER_DETAILS_INTERESTS, ADD_USER_PREF } from './actionTypes';

let initialState = {
    formDetails: [],
    error: false
}


export const addUserAppearance = (age, height_ft, height_in, hair_color, image1, image2, image3 ) => {
    let data = axios.post('/api/addUserAppearance', {age, height_ft, height_in, hair_color, image1, image2, image3 })
    .then(res => res.data)
    return {
        type: ADD_USER_APPEARANCE,
        payload: data
    }
}

export const addUserDetailsAndInterests = (gender, religion, ethnicity, intro_extro, description, sports, arts, music,books, movies, outdoors, food, pets, netflix, traveling, tech, fashion, fitness, gaming, politics) => {
    let data = axios.post('/api/addUserDetailsAndInterests', {gender, religion, ethnicity, intro_extro, description, sports, arts, music,books, movies, outdoors, food, pets, netflix, traveling, tech, fashion, fitness, gaming, politics})
    .then(res => res.data)
    return {
        type: ADD_USER_DETAILS_INTERESTS,
        payload: data
    }
}

export const addUserPref = (age_min, age_max, hair_color_pref, gender_pref, religion_pref, ethnicity_pref) => {
    let data = axios.post('/api/addPref', {age_min, age_max, hair_color_pref, gender_pref, religion_pref, ethnicity_pref})
    .then(res => res.data)
    return {
        type: ADD_USER_PREF,
        payload: data
    }
}

