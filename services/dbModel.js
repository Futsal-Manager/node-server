/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
const mongoose_1 = require("mongoose");
/** Internal dependencies **/
let UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    age: Number,
    friends: [String],
    data: [mongoose_1.Schema.Types.Mixed]
});
let FileSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    s3url: {
        type: String,
        required: true,
    },
});
exports.UserModel = mongoose_1.model('User', UserSchema);
exports.FileModel = mongoose_1.model('File', FileSchema);
