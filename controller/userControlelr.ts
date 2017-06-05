/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import UserService from './../services/userService';

export default class UserController {

    constructor() {

    }

    static createUser(req) {
        let username = req.body.username;
        let password = req.body.password;
        let team = req.body.team;

        return UserService.createUser(username, password, team);
    }

    static readUser(req) {
        let userID = req.params.id;
        return UserService.readUser(userID);
    }

    static updateUser(req) {
        let userID = req.params.id;
        let user = req.body;
        return UserService.updateUser(userID, user);
    }

    static deleteUser(req) {
        let userID = req.params.id;
        return UserService.deleteUser(userID);
    }

    static getTeamList(req) {
        return UserService.getTeamList();
    }

}
