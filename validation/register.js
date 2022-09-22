// Rules for registeration
// Use of Validator, which validates STRING parameters.

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    //Name tested if empty
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    // name validated if empty then throw error
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

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
    // is password long enough?
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }
    // is password2 empty?
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }
    // do both passwords match?
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};