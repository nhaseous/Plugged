const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Message
const MessageSchema = new Schema({
    message:{
        text: { type:String, required:true }
        // you can add any other properties to the message here.
        // for example, the message can be an image ! so you need to tweak this a little
    },
    // if you want to make a group chat, you can have more than 2 users in this array
    users:[{
        user: { type:mongoose.Schema.Types.ObjectId, ref:'User'}
    }],
    sender: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
    read: { type:Date }
},
{
    timestamps: true
});

const Messages = mongoose.model('messages', MessageSchema);

module.exports = Messages;
