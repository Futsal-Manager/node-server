/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
let request = require('request');
/** Internal dependencies **/
const fileController_1 = require("./../controller/fileController");
const config_1 = require("./../config");
class FileRouter {
    constructor() {
    }
    static uploadVideo(req, res) {
        console.log('======req body start========');
        console.log(req.body);
        console.log('======req body end========');
        fileController_1.default.parseForm(req).then((files) => {
            // 업로드된 파일을 프로세싱해야함.
            return Promise.resolve(files);
            // Todo 비디오 파일 포맷인지 검증하는 작업이 필요
        }).then((files) => {
            console.log('=========Parse Form success=====');
            return fileController_1.default.uploadVideo(files);
        }).then((s3url) => {
            console.log('=========File upload to s3 success==========');
            return fileController_1.default.s3URLsave(req, s3url);
        }).then((url) => {
            console.log('=========Server save s3url to mongo success');
            let options = {
                uri: config_1.default.IMAGE_PROCESSING_API + '/video/',
                method: 'POST',
                json: {
                    s3Url: url,
                    email: req.user.username,
                    ballColor: "#FFFFFF",
                    token: config_1.default.PROTOCOL_TOKEN
                }
            };
            request(options, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    console.log(body); // Print the shortened url.
                }
                else if (err) {
                    console.log(err);
                }
            });
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
