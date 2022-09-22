// axios-default will always make sure that the token is attached to the Header to authorize user.
// Otherwise, we would have to manually check if token is set in Header for every request we make.

import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        //Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;