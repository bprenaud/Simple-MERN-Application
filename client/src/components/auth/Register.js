import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { withRouter } from './withRouter'
import store from '../../store';
import { GET_ERRORS, USER_SUCCESSFUL_REG } from '../../actions/types'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            regStatus: 'reg was unsuccessful or did not update...',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Lifecycle component
    componentDidMount() {
        console.log('componenetDidMount() cycled')
        if (this.props.auth.isAuthenticated) {
            this.props.navigate('/dashboard');
        }
        // If user returns to Registration page after a successful 
        // registration then reset redux state
        if (this.props.reg.regStatus === 'OK') {
            store.dispatch({ type: USER_SUCCESSFUL_REG, payload: 'Not OK' })
            store.dispatch({ type: GET_ERRORS, payload: {} })
        }
    }

    //activated everytime Register component receives new props.
    // DEPRICATED...
    componentWillReceiveProps(nextProps) {
        // If redux state has successful axios.post
        // then set props state to local state and navigate user,
        if (nextProps.reg.regStatus === 'OK') {
            this.setState({ regStatus: nextProps.reg.regStatus });
            this.props.navigate('/Login');
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser);

    }

    render() {

        const { errors } = this.state;

        return (
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form noValidate onSubmit={this.onSubmit} className="form" action="create-profile.html">
                    <div className="form-group">
                        <input type="text"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.name
                            })}
                            placeholder="Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            placeholder="Email Address"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small
                        >
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            minLength="6"
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password2
                            })}
                            placeholder="Confirm Password"
                            name="password2"
                            value={this.state.password2}
                            onChange={this.onChange}
                            minLength="6"
                        />
                        {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/Login">Sign In</Link>
                </p>
            </section>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    reg: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    reg: state.reg,
    errors: state.errors
});

export default withRouter(connect(mapStateToProps, { registerUser })(Register));