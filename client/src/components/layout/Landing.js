import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withRouter } from '../auth/withRouter'

class Landing extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.navigate('/dashboard');
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="x-large">Cyber Hack</h1>
                        <p className="lead">
                            Create a cyber security specialist profile/portfolio, share posts and get help from
                            other specialists
                        </p>
                        <div className="buttons">
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                            <Link to="/login" className="btn btn-light">Login</Link>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,

});

export default withRouter(connect(mapStateToProps, {})(Landing));
