import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { loginUser } from '../../actions/authActions'
import { withRouter } from './withRouter'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    // Lifecyle component
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.navigate('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            // Redirect needs to be used with Navigate and withRouter.js
            this.props.navigate('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    }

    render() {
        const { errors } = this.state;

        return (
            <section className="container">
                {errors && (<div className="alert alert-danger">
                    Invalid credentials
                </div>)}
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <a href="register.html">Sign Up</a>
                </p>
            </section>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default withRouter(connect(mapStateToProps, { loginUser })(Login));