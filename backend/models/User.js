const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: true,
        default: ''
    },
    bio: {
        type: String,
        required: true,
        default: ''
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
