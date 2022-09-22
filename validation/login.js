// Rules for Login
// Use of Validator, which validates STRING parameters.

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    //email and password checked if empty
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // is email a valid email?
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    // is email empty?
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    // is password empty?
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};