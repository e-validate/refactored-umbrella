import axios from 'axios';
import { ADD_USER_APPEARANCE, ADD_USER_DETAILS_INTERESTS, ADD_USER_PREF, EDIT_USER_PROFILE } from './actionTypes';

let initialState = {
  formDetails: [],
  error: false
};

export const addUserAppearance = (
  age,
  height_ft,
  height_in,
  hair_color,
  image1,
  image2,
  image3,
  image4
) => {
  let data = axios
    .post("/api/addUserAppearance", {
      age,
      height_ft,
      height_in,
      hair_color,
      image1,
      image2,
      image3,
      image4
    })
    .then(res => res.data);
  return {
    type: ADD_USER_APPEARANCE,
    payload: data
  };
};
export function editUserAppearance(
  age,
  height_ft,
  height_in,
  hair_color,
  image1,
  image2,
  image3,
  image4,
  user_appearance_id
) {
  let data = axios
    .put(`/api/addUserAppearance/${user_appearance_id}`, {
      age,
      height_ft,
      height_in,
      hair_color,
      image1,
      image2,
      image3,
      image4
    })
    .then(res => res.data);
  return {
    type: EDIT_USER_APPEARANCE,
    payload: data
  };
}

export const getUserAppearance = user_id => {
  let data = axios
    .get(`/api/addUserAppearance/${user_id}`)
    .then(res => res.data);
  return {
    type: GET_USER_APPEARANCE,
    payload: data
  };
};

export const addUserDetailsAndInterests = (
  gender,
  religion,
  ethnicity,
  intro_extro,
  description,
  sports,
  arts,
  music,
  books,
  movies,
  outdoors,
  food,
  pets,
  netflix,
  traveling,
  tech,
  fashion,
  fitness,
  gaming,
  politics
) => {
  let data = axios
    .post("/api/addUserDetailsAndInterests", {
      gender,
      religion,
      ethnicity,
      intro_extro,
      description,
      sports,
      arts,
      music,
      books,
      movies,
      outdoors,
      food,
      pets,
      netflix,
      traveling,
      tech,
      fashion,
      fitness,
      gaming,
      politics
    })
    .then(res => res.data);
  return {
    type: ADD_USER_DETAILS_INTERESTS,
    payload: data
  };
};

export const editUserInterests = (
  sports,
  arts,
  music,
  books,
  movies,
  outdoors,
  food,
  pets,
  netflix,
  traveling,
  tech,
  fashion,
  fitness,
  gaming,
  politics,
  user_interests_id
) => {
  let data = axios
    .put(`/api/editUserInterests/${user_interests_id}`, {
      sports,
      arts,
      music,
      books,
      movies,
      outdoors,
      food,
      pets,
      netflix,
      traveling,
      tech,
      fashion,
      fitness,
      gaming,
      politics
    })
    .then(res => res.data);
  return {
    type: EDIT_USER_INTERESTS,
    payload: data
  };
};

export const editUserDetails = (
  gender,
  religion,
  ethnicity,
  intro_extro,
  description,
  user_details_id
) => {
  let data = axios
    .put(`/api/editUserDetails/${user_details_id}`, {
      gender,
      religion,
      ethnicity,
      intro_extro,
      description,
    })
    .then(res => res.data);
  return {
    type: EDIT_USER_DETAILS,
    payload: data
  };
};

export const getUserDetailsAndInterests = user_id => {
  let data = axios
    .get(`/api/addUserDetailsAndInterests/${user_id}`)
    .then(res => res.data);
  return {
    type: GET_USER_DETAILS_INTERESTS,
    payload: data
  };
};

export const addUserPref = (
  age_min,
  age_max,
  hair_color_pref,
  gender_pref,
  religion_pref,
  ethnicity_pref
) => {
  let data = axios
    .post("/api/addPref", {
      age_min,
      age_max,
      hair_color_pref,
      gender_pref,
      religion_pref,
      ethnicity_pref
    })
    .then(res => res.data);
  return {
    type: ADD_USER_PREF,
    payload: data
  };
};

export const editUserPref = (
  age_min,
  age_max,
  hair_color_pref,
  gender_pref,
  religion_pref,
  ethnicity_pref
) => {
  let data = axios
    .put(`/api/addPref/`, {
      age_min,
      age_max,
      hair_color_pref,
      gender_pref,
      religion_pref,
      ethnicity_pref
    })
    .then(res => res.data);
  return {
    type: EDIT_USER_PREF,
    payload: data
  };
};

export const getUserPref = user_id => {
  let data = axios.get(`/api/addPref/${user_id}`).then(res => res.data);
  return {
    type: GET_USER_PREF,
    payload: data
  };
};

export const editUserProfile = (age, name, religion, ethnicity, description, gender) => {
    let data = axios.put('/api/editUserProfile', {age, name, religion, ethnicity, description, gender})
    .then(res => res.data)
    return {
        type: EDIT_USER_PROFILE,
        payload: data
        }
    }

export default function formReducer(state = initialState, action) {
<<<<<<< HEAD
  let { type, payload } = action;
  switch (type) {
    case ADD_USER_APPEARANCE + "_FULFILLED":
      return {
        ...state,
        formDetails: payload,
        error: false
      };
    case ADD_USER_APPEARANCE + "_REJECTED":
      return {
        ...state,
        error: payload
      };
    case ADD_USER_DETAILS_INTERESTS + "_FULFILLED":
      return {
        ...state,
        formDetails: payload,
        error: false
      };
    case ADD_USER_DETAILS_INTERESTS + "_REJECTED":
      return {
        ...state,
        error: payload
      };
    case ADD_USER_PREF + "_FULFILLED":
      return {
        ...state,
        formDetails: payload,
        error: false
      };
    case ADD_USER_PREF + "_REJECTED":
      return {
        ...state,
        error: payload
      };
    case EDIT_USER_APPEARANCE + "_FULFILLED":
      return {
        ...state,
        formDetails: payload,
        error: false
      };
    case EDIT_USER_APPEARANCE + "_REJECTED":
      return {
        ...state,
        error: payload
      };
    case EDIT_USER_DETAILS + "_FULFILLED":
      return {
        ...state,
        formDetails: payload,
        error: false
      };
    case EDIT_USER_DETAILS + "_REJECTED":
      return {
        ...state,
        error: payload
      };
    case EDIT_USER_INTERESTS + "_FULFILLED":
      return {
        ...state,
        formDetails: payload,
        error: false
      };
    case EDIT_USER_INTERESTS + "_REJECTED":
      return {
        ...state,
        error: payload
      };
    case EDIT_USER_PREF + "_FULFILLED":
      return {
        ...state,
        formDetails: payload,
        error: false
      };
    case EDIT_USER_PREF + "_REJECTED":
      return {
        ...state,
        error: payload
      };
    case GET_USER_APPEARANCE + "_FULFILLED":
      return {
        ...state,
        formDetails: payload,
        error: false
      };
    case GET_USER_APPEARANCE + "_REJECTED":
      return {
        ...state,
        error: payload
      };
    case GET_USER_DETAILS_INTERESTS + "_FULFILLED":
      return {
        ...state,
        formDetails: payload,
        error: false
      };
    case GET_USER_DETAILS_INTERESTS + "_REJECTED":
      return {
        ...state,
        error: payload
      };
    case GET_USER_PREF + "_FULFILLED":
      return {
        ...state,
        formDetails: payload,
        error: false
      };
    case GET_USER_PREF + "_REJECTED":
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
=======
    let {type, payload} = action;
    switch(type) {
        case ADD_USER_APPEARANCE + '_FULFILLED':
        return {
            ...state,
            formDetails: payload,
            error: false
        }
        case ADD_USER_APPEARANCE + '_REJECTED':
        return {
            ...state,
            error: payload
        }
        case ADD_USER_DETAILS_INTERESTS + '_FULFILLED':
        return {
            ...state,
            formDetails: payload,
            error: false
        }
        case ADD_USER_DETAILS_INTERESTS + '_REJECTED':
        return {
            ...state,
            error: payload
        }
        case ADD_USER_PREF + '_FULFILLED':
        return {
            ...state,
            formDetails: payload,
            error: false
        }
        case ADD_USER_PREF + '_REJECTED':
        return {
            ...state,
            error: payload
        }
        case EDIT_USER_PROFILE + '_FULFILLED':
        return {
            ...state,
            formDetails: payload,
            error: false
        }
        case EDIT_USER_PROFILE + '_REJECTED':
        return {
            ...state,
            error: payload
        }

        default: 
        return state
    }
}
>>>>>>> master
