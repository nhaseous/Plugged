"use strict";
const mongoose = require("mongoose");

/*
    We can pull the artists directly from Spotify if they exist and add their simple fields to the database
    Otherwise add in basic fields directly and allow for some rerouting for the independent artists
 */
let Artist = new Schema({
    //link user info to populate the page
    user: [{type: Schema.type.ObjectId, ref: "User"}],
    //booking info available for the venues
    booking: { type: String, default: ' '}
});