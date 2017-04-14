/**
 * Created by yuhogyun on 2017. 2. 3..
 */
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const mailController_1 = require("./../controller/mailController");
const config_1 = require("./../config");
class MailRouter {
    constructor() {
    }
    static send(req, res) {
        let email = req.body.email;
        let processedS3Url = req.body.processedS3Url;
        let token = req.body.token;
        if (token === config_1.default.PROTOCOL_TOKEN) {
            mailController_1.default.sendMail(email, processedS3Url).then(() => {
                res.status(200).json({ msg: '', isSuccess: true });
            }).catch((err) => {
                res.status(200).json({ msg: err, isSuccess: false });
            });
        }
        else {
            res.status(200).json({ msg: 'Token Validation Failed', isSuccess: false });
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MailRouter;
;
