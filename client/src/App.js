import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // react component that holds or stores the state and has to wrap around everything
import jwt_decode from 'jwt-decode';

import './App.css';
import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

//check for token on every page request 
if (localStorage.jwtToken) {
  // Set token to Authorization in Header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and Authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    // Redirect to login
    window.location.href = '/';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
    )
  }
}



export default App;
