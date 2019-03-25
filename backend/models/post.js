const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var now = new Date();

// Define collection and schema for Post
let Post = new Schema({
  user_id: {
    type: String
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
      type: Date,
      default: now
  },
  body: {
    type: String
  }
},{
    collection: 'posts'
});

module.exports = mongoose.model('Post', Post);
