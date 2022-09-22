// createStore is deprecated and used only for learning purposes.
// Implement redux toolkit (RTK) as explained here: https://redux.js.org/introduction/why-rtk-is-redux-today.
import { applyMiddleware, legacy_createStore as createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Index.js set as root so don't need to call it by name, just the directory

const initialState = {};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // Implement Redux devtool extension
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;