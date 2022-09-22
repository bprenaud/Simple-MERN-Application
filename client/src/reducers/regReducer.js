
import { USER_SUCCESSFUL_REG } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    regStatus: 'Not OK',
    user: {}
}

export default function (state = initialState, action) {
    // Switch needs to be replaced when using Redux ToolKit: 
    // https://redux.js.org/introduction/why-rtk-is-redux-today.
    switch (action.type) {
        case USER_SUCCESSFUL_REG:
            return {
                ...state,
                // if user successfully registerd, then a res.status(200) should be passed in action.payload
                regStatus: action.payload
            }
        default:
            return state;
    }
}