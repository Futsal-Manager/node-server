/**
 * Created by yuhogyun on 2017. 2. 3..
 */

/** External dependencies **/

/** Internal dependencies **/
import MailController from './../controller/mailController';
import Config from './../config'

export default class MailRouter {
    constructor() {

    }

    static send(req, res) {
        let email = req.body.email;
        let processedS3Url = req.body.processedS3Url;
        let token = req.body.token;
        if(token === Config.PROTOCOL_TOKEN) {
            MailController.sendMail(email, processedS3Url).then(() => {
                res.status(200).json({msg: '', isSuccess: true})
            }).catch((err) => {
                res.status(200).json({msg: err, isSuccess: false})
            });
        } else {
            res.status(200).json({msg: 'Token Validation Failed', isSuccess: false});
        }
    }

};
