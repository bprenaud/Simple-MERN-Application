// Here we store all of our reducers
import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import regReducer from './regReducer';

export default combineReducers({
    // Whenever we use anything from authReducer and its components
    //  we will use 'this.props.auth'.
    auth: authReducer,
    reg: regReducer,
    errors: errorReducer
});