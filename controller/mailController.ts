/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import MailService from './../services/mailService'

export default class MailController {
    constructor() {

    }

    static sendMail(email, processedS3Url) {
        return MailService.sendMail(email, processedS3Url);
    }

}