/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
const express = require("express");
const passport = require("passport");
/** Internal dependencies **/
const userRouter_1 = require("./userRouter");
const mainRouter_1 = require("./mainRouter");
const authRouter_1 = require("./authRouter");
const authMiddleware_1 = require("./../middleware/authMiddleware");
const fileRouter_1 = require("./fileRouter");
const mailRouter_1 = require("./mailRouter");
let router = express.Router();
router.get('/', mainRouter_1.default.index);
/******************************************************************************************
 * USER CRUD Logic (Only Dev Test)
 ******************************************************************************************/
router.get('/auth/signup', userRouter_1.default.signupPage);
router.post('/auth/signup', userRouter_1.default.create);
router.get('/user/:id', authMiddleware_1.default.userAuthenticated, userRouter_1.default.read); // Todo: Only dev test
router.put('/user/:id', authMiddleware_1.default.userAuthenticated, userRouter_1.default.update);
router.delete('/user/:id', authMiddleware_1.default.userAuthenticated, userRouter_1.default.delete); // Todo: Only dev test
/******************************************************************************************
 * Local Strategy Auth Logic
 ******************************************************************************************/
router.get('/auth/login', authRouter_1.default.login); // send facebook auth link
router.get('/auth/success', authRouter_1.default.success); // Don't need to. because this route can be redirected local or facebook
router.get('/auth/fail', authRouter_1.default.fail);
router.post('/auth/login', // local auth router
passport.authenticate('local'), authMiddleware_1.default.userAuthenticated, authRouter_1.default.success);
router.get('/auth/logout', authMiddleware_1.default.userAuthenticated, authRouter_1.default.logout);
/******************************************************************************************
 * Facebook Auth Logic
 ******************************************************************************************/
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/fail' }, authRouter_1.default.success));
/******************************************************************************************
 * File Upload and Read Logic
 ******************************************************************************************/
router.get('/file/upload', authMiddleware_1.default.userAuthenticated, fileRouter_1.default.uploadPage);
router.post('/file', authMiddleware_1.default.userAuthenticated, fileRouter_1.default.upload);
router.get('/file', authMiddleware_1.default.userAuthenticated, fileRouter_1.default.list);
/******************************************************************************************
 * Mail Router
 ******************************************************************************************/
router.post('/mail/hook', mailRouter_1.default.send);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
