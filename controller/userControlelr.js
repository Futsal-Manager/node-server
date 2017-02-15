/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
const userService_1 = require("./../services/userService");
class UserController {
    constructor() {
    }
    static createUser(req) {
        let username = req.body.username;
        let password = req.body.password;
        return userService_1.default.createUser(username, password);
    }
    static readUser(req) {
        let userID = req.params.id;
        return userService_1.default.readUser(userID);
    }
    static updateUser(req) {
        let userID = req.params.id;
        let user = req.body;
        return userService_1.default.updateUser(userID, user);
    }
    static deleteUser(req) {
        let userID = req.params.id;
        return userService_1.default.deleteUser(userID);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserController;
