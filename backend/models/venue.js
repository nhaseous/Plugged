'use strict';
const mongoose = require("mongoose");


let Venue = new Schema( {
    user: { type: Schema.Types.ObjectId, ref: "User"},
    addr: { type: String, required: true},
    description: { type: String, required: true},
});