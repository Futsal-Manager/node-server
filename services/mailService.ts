/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/

/** External dependencies **/


/** Internal dependencies **/
import CONFIG from './../config';
let mailgun = require('mailgun-js')({apiKey: CONFIG.MAILGUN_API_KEY, domain: CONFIG.MAILGUN_DOMAIN});
import {makeHTMLtemplate} from './mailHTML';

export default class MailService {
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
                html: makeHTMLtemplate(processedS3Url)
            };
            mailgun.messages().send(data, function (error, body) {
                if (error) reject(error);
                resolve(body);
            });
        });
    }
}