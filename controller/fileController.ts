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

    static upload(file) {
        return FileService.upload(file);
    }

    static parseForm(req) {
        return FileService.parse(req);
    }

    static s3URLsave(username, s3url) {
        return FileService.save(username, s3url);
    }

    static getList(req) {
        let username = req.user.username;
        return FileService.retrieveList(username);
    }


}
