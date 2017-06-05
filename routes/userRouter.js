/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const userControlelr_1 = require("./../controller/userControlelr");
class UserRouter {
    constructor() {
    }
    static create(req, res) {
        userControlelr_1.default.createUser(req).then(() => {
            res.status(200).json({ res: 'success' });
        }).catch((err) => {
            res.status(500).json({ errmsg: err });
        });
    }
    static read(req, res) {
        userControlelr_1.default.readUser(req).then((user) => {
            res.status(200).json({ res: user });
        }).catch((err) => {
            res.status(500).json({ errmsg: err.errmsg });
        });
    }
    static update(req, res) {
        userControlelr_1.default.updateUser(req).then((user) => {
            res.status(200).json({ res: user });
        }).catch((err) => {
            res.status(500).json({ errmsg: err.errmsg });
        });
    }
    static delete(req, res) {
        userControlelr_1.default.deleteUser(req).then((user) => {
            res.status(200).json({ res: user });
        }).catch((err) => {
            res.status(500).json({ errmsg: err.errmsg });
        });
    }
    static teamList(req, res) {
        userControlelr_1.default.getTeamList(req).then((teams) => {
            res.status(200).json({ teams: teams });
        }).catch((err) => {
            res.status(500).json({ errmsg: err.errmsg });
        });
    }
    static signupPage(req, res) {
        res.sendFile('signup.html', { root: __dirname + '/../public/html' });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserRouter;
;
