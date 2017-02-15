/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const fileService_1 = require("./../services/fileService");
class FileController {
    constructor() {
    }
    static upload(file) {
        return fileService_1.default.upload(file);
    }
    static parseForm(req) {
        return fileService_1.default.parse(req);
    }
    static s3URLsave(req, s3url) {
        let username = req.user.username;
        return fileService_1.default.save(username, s3url);
    }
    static getList(req) {
        let username = req.user.username;
        return fileService_1.default.retrieveList(username);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileController;
