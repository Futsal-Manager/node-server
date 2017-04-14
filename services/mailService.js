/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const config_1 = require("./../config");
let mailgun = require('mailgun-js')({ apiKey: config_1.default.MAILGUN_API_KEY, domain: config_1.default.MAILGUN_DOMAIN });
const mailHTML_1 = require("./mailHTML");
class MailService {
    constructor() {
    }
    static sendMail(email, processedS3Url) {
        return new Promise((resolve, reject) => {
            console.log('processedS3Url is' + processedS3Url);
            let data = {
                from: 'Futsal-Manager <yoohoogun114@naver.com>',
                to: email,
                subject: 'Futsal Manager가 하이라이트 작업을 완료했습니다',
                text: '',
                html: mailHTML_1.makeHTMLtemplate(processedS3Url)
            };
            mailgun.messages().send(data, function (error, body) {
                if (error)
                    reject(error);
                resolve(body);
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MailService;
