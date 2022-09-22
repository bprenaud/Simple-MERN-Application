import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// attach Navbar to redux Auth state
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { withRouter } from '../auth/withRouter'


class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        this.props.navigate('/');
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul>
                <li>
                    <Link to="/Landing">
                        <a href='' onClick={this.onLogoutClick.bind(this)}>
                            <img
                                className='rounded-circle'
                                src={user.avatar}
                                alt={user.name}
                                title="You must have a Gravatar connected to your email to display an image."
                                style={{ width: '25px', marginRight: '5px' }}
                            />
                            Logout
                        </a>
                    </Link>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul>
                <li><Link to="/Register">Register</Link></li>
                <li><Link to="/Login">Login</Link></li>
            </ul>
        );

        return (
            <body>
                <nav className="navbar bg-dark">
                    <h1>
                        <Link to="/"><i className="fas fa-code"></i>CyberHack</Link>
                    </h1>
                    <ul>
                        <li><Link to="/profiles">Profiles</Link></li>
                        {isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </nav>
            </body>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logoutUser })(Navbar));
