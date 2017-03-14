/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/

/** External dependencies **/
import * as express from 'express';
import * as passport from 'passport';

/** Internal dependencies **/
import UserRouter from './userRouter';
import MainRouter from './mainRouter';
import AuthRouter from './authRouter';
import AuthMiddleware from './../middleware/authMiddleware';
import FileRouter from './fileRouter';

let router = express.Router();

router.get('/', MainRouter.index);

/******************************************************************************************
 * USER CRUD Logic (Only Dev Test)
 ******************************************************************************************/
router.get('/auth/signup', UserRouter.signupPage);
router.post('/auth/signup', UserRouter.create);
router.get('/user/:id', AuthMiddleware.userAuthenticated, UserRouter.read); // Todo: Only dev test
router.put('/user/:id', AuthMiddleware.userAuthenticated, UserRouter.update);
router.delete('/user/:id', AuthMiddleware.userAuthenticated, UserRouter.delete); // Todo: Only dev test

/******************************************************************************************
 * Local Strategy Auth Logic
 ******************************************************************************************/
router.get('/auth/login', AuthRouter.login); // send facebook auth link
// router.get('/auth/success', AuthRouter.success); // Don't need to. because this route can be redirected local or facebook
router.get('/auth/fail', AuthRouter.fail);
router.post('/auth/login', // local auth router
    passport.authenticate('local',
        {successRedirect: '/',
        failureRedirect: '/auth/fail',
        failureFlash: false })
);

/******************************************************************************************
 * Facebook Auth Logic
 ******************************************************************************************/
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/auth/fail' }));

/******************************************************************************************
 * File Upload and Read Logic
 ******************************************************************************************/
router.get('/file/upload', AuthMiddleware.userAuthenticated, FileRouter.uploadPage);
router.post('/file', AuthMiddleware.userAuthenticated, FileRouter.upload);
router.get('/file', AuthMiddleware.userAuthenticated, FileRouter.list);


export default router;
