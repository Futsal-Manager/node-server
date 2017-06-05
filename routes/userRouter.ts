/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import UserController from './../controller/userControlelr';

export default class UserRouter {
    constructor() {

    }

    static create(req, res) {
        UserController.createUser(req).then(() => {
            res.status(200).json({res: 'success'});
        }).catch((err) => {
            res.status(500).json({errmsg: err});
        });
    }

    static read(req, res) {
        UserController.readUser(req).then((user) => {
            res.status(200).json({res: user});
        }).catch((err) => {
            res.status(500).json({errmsg: err.errmsg});
        });
    }

    static update(req, res) {
        UserController.updateUser(req).then((user) => {
            res.status(200).json({res: user});
        }).catch((err) => {
            res.status(500).json({errmsg: err.errmsg});
        });
    }

    static delete(req, res) {
        UserController.deleteUser(req).then((user) => {
            res.status(200).json({res: user});
        }).catch((err) => {
            res.status(500).json({errmsg: err.errmsg});
        });
    }

    static teamList(req, res) {
        UserController.getTeamList(req).then((teams) => {
            res.status(200).json({teams: teams});
        }).catch((err) => {
            res.status(500).json({errmsg: err.errmsg});
        });
    }

    static signupPage(req, res) {
        res.sendFile('signup.html', {root: __dirname +'/../public/html'});
    }
};
