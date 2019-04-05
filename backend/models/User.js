const mongoose = require('mongoose');
const friendsPlugin = require('mongoose-friends-plugin');

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
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    mode: {
        type: String,
        enum: ['Listener', 'Artist', 'Venue'],
        default: 'Listener',
        required: true
    },
    connections:[{
        user: { type:mongoose.Schema.Types.ObjectId, ref:'User'},
        default: ''
    }],
});

UserSchema.plugin(friendsPlugin({ pathName: 'friends' }));

const User = mongoose.model('users', UserSchema);

module.exports = User;
