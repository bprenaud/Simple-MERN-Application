// Rules for Experience
// Use of Validator, which validates STRING parameters.

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};
    //email and password checked if empty
    data.company = !isEmpty(data.company) ? data.company : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    // is company empty
    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }

    // is title empty
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }

    // is from empty
    if (Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};