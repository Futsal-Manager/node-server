/**
 * Created by yuhogyun on 2017. 2. 3..
 */
"use strict";
/** External dependencies **/
let request = require('request');
/** Internal dependencies **/
const editController_1 = require("./../controller/editController");
const mailController_1 = require("../controller/mailController");
class EditRouter {
    constructor() {
    }
    static edit(req, res) {
        editController_1.default.extractHighlight(req, res).then((s3url) => {
            res.status(200).json({ isSuccess: true, s3url: s3url });
            return Promise.resolve({ email: req.body.email, s3url: s3url });
        }).then((highlightRes) => {
            let email = highlightRes['email'];
            let s3url = highlightRes['s3url'];
            mailController_1.default.sendMail(email, s3url).then(() => {
                console.log('mail sended');
            }).catch((err) => {
                console.log('mail sended failed', err);
            });
        }).catch(() => {
        });
    }
    static list(req, res) {
        res.status(200).json({ isSuccess: true });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditRouter;
;
