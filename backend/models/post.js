'use strict';

let Post = new Schema({
   msg: { type: String, required: true},
   time: { type: Date, required: true}
});

User.pre("save", function(next) {
    this.msg = this.first_name.replace(/<(?:.|\n)*?>/gm, "");
    next();
});