/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/

/** External dependencies **/
import {Document, model, Model, Schema} from 'mongoose';

/** Internal dependencies **/

let UserSchema: Schema = new Schema({
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

interface IUser extends Document {
    username: string;
    password: string;
    team: string;
}

let UploadedFileSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    s3url: {
        type: String,
        required: true,
    }
});

interface IUploadFile extends Document {
    username: string,
    s3url: string,
}

let HighlightFileSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    s3url: {
        type: String,
        required: true,
    },
});

interface IHighlightFile extends Document {
    username: string,
    s3url: string,
}

export let UserModel: Model<IUser> = model<IUser>('User', UserSchema);
export let UploadFileModel: Model<IUploadFile> = model<IUploadFile>('UploadFile', UploadedFileSchema);
export let HighlightFileModel: Model<IHighlightFile> = model<IHighlightFile>('HighlightFile', HighlightFileSchema);
