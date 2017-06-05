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
    team: {
        type: String,
        required: true
    }
});
let UploadedFileSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    s3url: {
        type: String,
        required: true,
    }
});
let HighlightFileSchema = new mongoose_1.Schema({
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
exports.UploadFileModel = mongoose_1.model('UploadFile', UploadedFileSchema);
exports.HighlightFileModel = mongoose_1.model('HighlightFile', HighlightFileSchema);
