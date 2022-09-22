// Post model. 
// Each post will have a user and their avatar connected to the post within the model
// This will ensure that if the user is deleted that their comments/posts are not deleted along with them.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create post schema

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    // likes array will be populated with user's id when they 'like' a post
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            avatar: {
                type: String
            },
            // Date for the comment
            date: {
                type: Date,
                default: Date.now
            }
        },
    ],
    // Date for the post
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);