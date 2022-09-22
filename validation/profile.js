// Rules for Profile
// Use of Validator, which validates STRING parameters.

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};
    //email and password checked if empty
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    // make sure handle is correct length
    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }
    // Check if the handle is empty
    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }
    // Check if status is empty
    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }
    // Check if skills is empty
    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'skills field is required';
    }
    // Check if website and social medias are NOT empty then Check if the URL is valid
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }
    // Youtube
    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }
    // Twitter
    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }
    // Facebook
    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }
    // Instagram
    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }
    // LinkedIn
    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};