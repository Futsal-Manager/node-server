/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import FileController from './../controller/fileController';

export default class FileRouter {
    constructor() {

    }

    static upload(req, res) {
        FileController.parseForm(req).then((files) => { // 1. form parsing
            return Promise.resolve(files);
            // Todo 비디오 파일 포맷인지 검증하는 작업이 필요
        }).then((files) => { // 2. upload image to s3
            return FileController.upload(files);
        }).then((s3url) => { // 3. save url and userInfo to mongoDB
            return FileController.s3URLsave(req, s3url);
        }).then((url) => {
            res.status(200).json({s3url: url});
        }).catch((err) => {
            res.status(500).json({res: err});
        });
    }

    static uploadPage(req, res) {
        res.sendFile('upload.html', {root: __dirname +'/../public/html'});
    }

    static list(req, res) {
        FileController.getList(req).then((files) => {
           res.status(200).json({list: files})
        });
    }
}
