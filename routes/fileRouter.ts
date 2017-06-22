/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/

/** External dependencies **/
let request = require('request');


/** Internal dependencies **/
import FileController from './../controller/fileController';

import Config from './../config'

export default class FileRouter {
    constructor() {

    }

    static uploadVideo(req, res) {
        console.log('======req body start========');
        console.log(req.body);
        console.log('======req body end========');
        FileController.parseForm(req).then((files) => { // 1. form parsing
            // 업로드된 파일을 프로세싱해야함.
            return Promise.resolve(files);
            // Todo 비디오 파일 포맷인지 검증하는 작업이 필요
        }).then((files) => { // 3. upload image to s3
            console.log('=========Parse Form success=====');
            return FileController.uploadVideo(files);
        }).then((s3url) => { // 4. save url and userInfo to mongoDB
            console.log('=========File upload to s3 success==========');
            return FileController.s3URLsave(req, s3url);
        }).then((url) => {
            console.log('=========Server save s3url to mongo success');
            let options = {
                uri: Config.IMAGE_PROCESSING_API + '/video/',
                method: 'POST',
                json: {
                    s3Url : url,
                    email: req.user.username, // email
                    ballColor: "#FFFFFF",
                    token: Config.PROTOCOL_TOKEN
                }
            }

            request(options, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    console.log(body) // Print the shortened url.
                } else if(err){
                    console.log(err);
                }
            })


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
