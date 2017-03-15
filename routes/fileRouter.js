/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const fileController_1 = require("./../controller/fileController");
class FileRouter {
    constructor() {
    }
    static upload(req, res) {
        fileController_1.default.parseForm(req).then((files) => {
            return Promise.resolve(files);
            // Todo 비디오 파일 포맷인지 검증하는 작업이 필요
        }).then((files) => {
            console.log('=========Server Parse form success');
            return fileController_1.default.upload(files);
        }).then((s3url) => {
            console.log('=========Server upload success');
            return fileController_1.default.s3URLsave(req, s3url);
        }).then((url) => {
            console.log('=========Server save s3url to mongo success');
            res.status(200).json({ s3url: url });
        }).catch((err) => {
            res.status(500).json({ res: err });
        });
    }
    static uploadPage(req, res) {
        res.sendFile('upload.html', { root: __dirname + '/../public/html' });
    }
    static list(req, res) {
        fileController_1.default.getList(req).then((files) => {
            res.status(200).json({ list: files });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileRouter;
