const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var now = new Date();

// Define collection and schema for Post
let Post = new Schema({
  sender: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
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
