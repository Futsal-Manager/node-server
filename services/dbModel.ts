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

let FileSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    s3url: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true
    }
});

interface IFile extends Document {
    username: string,
    s3url: string,
    thumbnailUrl: string
}

export let UserModel: Model<IUser> = model<IUser>('User', UserSchema);
export let FileModel: Model<IFile> = model<IFile>('File', FileSchema);
