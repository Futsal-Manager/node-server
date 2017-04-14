/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const mailService_1 = require("./../services/mailService");
class MailController {
    constructor() {
    }
    static sendMail(email, processedS3Url) {
        return mailService_1.default.sendMail(email, processedS3Url);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MailController;
