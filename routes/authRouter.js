/**
 * Created by yuhogyun on 2017. 2. 3..
 */
"use strict";
const path = require('path');
class AuthRouter {
    constructor() {
    }
    static login(req, res) {
        if (req.user)
            return res.redirect('/auth/success');
        res.sendFile('login.html', { root: __dirname + '/../public/html' });
    }
    static success(req, res) {
        res.status(200).json({ msg: 'success login' });
    }
    static fail(req, res) {
        res.status(200).json({ msg: 'fail login' });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthRouter;
;
