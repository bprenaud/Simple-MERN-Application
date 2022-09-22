// Rules for Posts
// Use of Validator, which validates STRING parameters.

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};
    //email and password checked if empty
    data.text = !isEmpty(data.text) ? data.text : '';

    // is text within required length?
    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters';
    }

    // is text empty?
    // isEmpty must be last in list of validation conditions
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};