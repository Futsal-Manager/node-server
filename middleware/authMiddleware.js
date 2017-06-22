/**
 * Created by yuhogyun on 2017. 2. 4..
 */
"use strict";
const authRouter_1 = require("./../routes/authRouter");
const config_1 = require("./../config");
class AuthMiddleware {
    constructor() {
    }
    static userAuthenticated(req, res, next) {
        if (req.user) {
            next();
        }
        else {
            console.log('Auth Failed');
            authRouter_1.default.fail(req, res);
        }
    }
    static serverAuthenticated(req, res, next) {
        if (req.body['token'] === config_1.default.PROTOCOL_TOKEN) {
            next();
        }
        else {
            console.log('Server Auth Failed');
            authRouter_1.default.fail(req, res);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthMiddleware;
