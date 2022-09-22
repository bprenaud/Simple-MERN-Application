// location, bio, experiences, education, social network links

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');


// @route GET /api/profile/test
// @desc Tests Profile route
// @access PUBLIC
router.get('/test', (res) => res.json({ msg: "Profile API works!" }));

// @route GET /api/profile
// @desc Get current users profile
// @access Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar'])// Includes user's name and avatar into their profile
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user';
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route GET /api/profile/all
// @desc Get all profiles
// @access Public
router.get('/all', (req, res) => {
    const errors = {};
    // mongoose function 'find' to get all profiles
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofiles = 'There are no profiles available at this time';
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err => res.status(404).json({ profiles: 'There are no Profiles' }));
});

// @route GET /api/profile/handle/:handle (for backend api route, not used by user)
// @desc Get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })// what ever is in the URL it will populate :handle
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route GET /api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })// what ever is in the URL it will populate :user_id
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json({ profile: "No profile found" }));
});

// @route POST /api/profile
// @desc Create or Edit user profile
// @access Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id; // get user
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

        // Skills - Split into array
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(','); //splits the list at the comma
        }

        // Social
        profileFields.social = {}; // Social an object with objects
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    // Update profile
                    Profile.findOneAndUpdate( //mongoose function returns a promise
                        { use: req.user.id },
                        { $set: profileFields },
                        { new: true }
                    )
                        .then(profile => res.json(profile)); // respond with the updated profile
                } else {
                    // Create 

                    // Check if handle exists
                    Profile.findOne({ handle: profileFields.handle })
                        .then(profile => {
                            if (profile) {
                                errors.handle = 'That handle already exists';
                                return res.status(400).json(errors);
                            }

                            // Save profile
                            new Profile(profileFields).save().then(profile => res.json(profile));
                        });
                }
            });

    }
);

// @route POST /api/profile/experience
// @desc Add experience to profile
// @access Private
router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateExperienceInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                const newExp = {
                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }

                // Add experience to user's profile
                profile.experience.unshift(newExp); // push would put exp to the end of the profile. Use unshift to keep it upfront.
                profile.save().then(profile => res.json(profile)); // return user's profile after saving
            })
    });

// @route POST /api/profile/education
// @desc Add education to profile
// @access Private
router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateEducationInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                const newEdu = {
                    school: req.body.school,
                    degree: req.body.degree,
                    fieldofstudy: req.body.fieldofstudy,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }

                // Add education to user's profile
                profile.education.unshift(newEdu); // push would put education to the end of the profile. Use unshift to keep it upfront.
                profile.save().then(profile => res.json(profile)); // return user's profile after saving
            })
    });

// @route DELETE /api/profile/experience/:exp_id
// @desc Delte experience from profile
// @access Private
router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id);
                // Splice out of array
                profile.experience.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route DELETE /api/profile/education/:edu_id
// @desc Delte education from profile
// @access Private
router.delete(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);
                // Splice out of array
                profile.education.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route DELETE /api/profile/
// @desc Delte user and profile
// @access Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // Find profile and remove profile with mongoose funct
        Profile.findOneAndRemove({ user: req.user.id })
            .then(() => {
                // Find user and remove user with mongoose funct
                User.findOneAndRemove({ _id: req.user.id })
                    .then(() => {
                        res.json({ success: true });
                    }
                    );
            });
    }
);



module.exports = router