/**
 * Created by yuhogyun on 2017. 2. 3..
 */
"use strict";
const LOCAL_IMAGE_PROCESSING_API = 'http://localhost:8000';
const REMOTE_IMAGE_PROCESSING_API = 'http://ec2-52-78-155-90.ap-northeast-2.compute.amazonaws.com';
exports.AWS_NODE_SERVER_API = 'http://ec2-52-79-77-112.ap-northeast-2.compute.amazonaws.com';
exports.REMOTE_MODE = 'REMOTE';
exports.LOCAL_MODE = 'LOCAL';
exports.NOWMODE = exports.REMOTE_MODE;
const CONFIG = {
    BCRYPT_SALT_ROUNDS: 10,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    FACEBOOK_REDIRECT_URL: process.env.FACEBOOK_REDIRECT_URL || 'http://localhost:3000/auth/facebook/callback',
    SESSION_SECRET_KEY: 'sdnfsdjfpdsfijdp!@#',
    AWS_REGION: 'ap-northeast-2',
    // Todo: 하드코딩 되어있는 config를 환경변수로 바꾸기
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY || 'key-5071c2d41b08df0671c75464deda33f3',
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN || 'sandbox9c41f305e6c04852a25aa8d705b3a4c7.mailgun.org',
    PROTOCOL_TOKEN: process.env.PROTOCOL_TOKEN || 'dfisdfn2@#23sdfbjsdfj23klnSDFn1l32nlkndskdskfjs@#f@!#dsf',
    IMAGE_PROCESSING_API: (exports.NOWMODE === exports.LOCAL_MODE) ? LOCAL_IMAGE_PROCESSING_API : REMOTE_IMAGE_PROCESSING_API // Local: http://localhost: 8000
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CONFIG;
