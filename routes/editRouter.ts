/**
 * Created by yuhogyun on 2017. 2. 3..
 */

/** External dependencies **/
let request = require('request');


/** Internal dependencies **/
import EditController from './../controller/editController';
import MailController from "../controller/mailController";


export default class EditRouter {
    constructor() {

    }

    static edit(req, res) {
        EditController.extractHighlight(req, res).then((s3url) => {
            res.status(200).json({isSuccess: true, s3url: s3url});
            return Promise.resolve({email: req.body.email, s3url: s3url});
        }).then((highlightRes) => {
            let email = highlightRes['email'];
            let s3url = highlightRes['s3url'];
            MailController.sendMail(email, s3url).then(() => {
                console.log('mail sended');
            }).catch((err) => {
                console.log('mail sended failed', err);
            });
        }).catch(() => {

        });
    }

    static list(req, res) {
        res.status(200).json({isSuccess: true});
    }
};
