/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import FileService from './../services/fileService';

export default class FileController {

    constructor() {

    }

    static uploadVideo(file) {
        return FileService.uploadVideo(file);
    }

    static parseForm(req) {
        return FileService.parse(req);
    }

    static s3URLsave(req, s3url) {
        let username = req.user.username;
        return FileService.save(username, s3url);
    }

    static getList(req) {
        let username = req.user.username;
        return FileService.retrieveList(username);
    }


}
