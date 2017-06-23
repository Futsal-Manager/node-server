/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const imageEditService_1 = require("./../services/imageEditService");
const fileService_1 = require("./../services/fileService");
const rootPath_1 = require("./../rootPath");
class EditController {
    constructor() {
    }
    static extractHighlight(req, res) {
        console.log('extractHighlight request body', req.body);
        let fileUrl = req.body['processedS3Url'];
        let fileName = req.body['fileName'];
        let email = req.body['email'];
        let timeArr = req.body['timeArr'];
        return new Promise((resolve) => {
            // file을 다운받고 filePath 전달
            fileService_1.default.downloadFileFromUrl(fileUrl, fileName, email).then((downloadFileName) => {
                // 하이라이트를 timeArr에 의해 편집
                console.log('download video from server completed');
                console.log('으아아', rootPath_1.default + "/" + "result" + fileName + ".mp4");
                return imageEditService_1.default.extractHighlightByTimeArr(downloadFileName, timeArr, rootPath_1.default + "/" + "result" + fileName + ".mp4");
            }).then((musicVideoPath) => {
                // s3에 업로드하고
                console.log('highlight extract success path is: ', musicVideoPath);
                return fileService_1.default.uploadVideo({ name: musicVideoPath, path: musicVideoPath });
            }).then((s3url) => {
                console.log('highlight upload success');
                return imageEditService_1.default.saveHighlightToDb(s3url, email);
                // 하이라이트 url을 db에 저장
            }).then((s3url) => {
                console.log('saveHighlightToDb success');
                resolve(s3url);
            }).catch((err) => {
                console.log('ffmpeg err', err);
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditController;
