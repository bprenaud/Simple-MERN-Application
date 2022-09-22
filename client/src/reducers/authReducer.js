import isEmpty from '../validation/is-empty'

import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    // Switch needs to be replaced when using Redux ToolKit: 
    // https://redux.js.org/introduction/why-rtk-is-redux-today.
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                // if user is authenticated and assigned a jwt then payload will be filled. 
                // Otherwise, payload will be an empty object.
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}