import { GET_ERRORS } from '../actions/types';

const initialState = {};


export default function (state = initialState, action) {
    // Switch needs to be replaced when using Redux ToolKit: 
    // https://redux.js.org/introduction/why-rtk-is-redux-today.
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}