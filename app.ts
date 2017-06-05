/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/

/** External dependencies **/
import * as express from 'express';
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

/** Mongoose Config **/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/futsalmanager');

import * as passport from 'passport';
import * as session from 'express-session';
let FacebookStrategy = require('passport-facebook').Strategy;
let LocalStrategy = require('passport-local').Strategy;

/** Intern al dependencies **/
import {UserModel} from './services/dbModel';
import UserService from './services/userService';
import CONFIG from './config';


// Todo : passport Configuration 파일 분할
passport.use(new FacebookStrategy({
      clientID: CONFIG.FACEBOOK_CLIENT_ID,
      clientSecret: CONFIG.FACEBOOK_CLIENT_SECRET,
      callbackURL: CONFIG.FACEBOOK_REDIRECT_URL,
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
    // Todo: 페이스북 계정이 회원가입 되었는지 보고, 회원가입 안 되었으면 가입시킴, 가입이 되어 있으면 로그인시켜줌
    console.log("========Facebook========");
    console.log(profile);
    console.log("========Facebook========");
    done(null, profile);
    // Todo : Facebook auth 성공시 createOrUpdate
    // UserModel.findOneAndUpdate({username: '123'})
    /*
    User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
    */
    }
));

passport.use(new LocalStrategy(
    function(username, password, done) {
        UserModel.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            UserService._verifyPassword(password, user.password).then(res => {
                if (!res) return done(null, false, { message: 'Incorrect password.' });
                return done(null, user);
            });
        });
    })
);

passport.serializeUser(function(user, done) {
    /*
    console.log('=============passport serializeUser===========');
    console.log(user);
    console.log('=============passport serializeUser===========');
    */
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    /*
    console.log('=============passport deserializeUser===========');
    console.log(id);
    console.log('=============passport deserializeUser===========');
    */
    UserService.readUser(id).then((user) => {
        done(null, user);
    }).catch((err) => {
        done(err, 'error');
    });
});

/** Internal dependencies **/
import index from './routes/index';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(cookieParser(CONFIG.SESSION_SECRET_KEY));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: CONFIG.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(index);

// Headers parser
/*
 app.use(function(req, res, next){
 console.log('=============Cookies parser start===========');
 console.log(req.cookies);
 console.log('=============Cookies parser end===========');
 console.log('=============Headers parser start===========');
 console.log(req.headers);
 console.log('=============Headers parser end===========');
 console.log('=============Body parser start===========');
 console.log(req.body);
 console.log('=============Body parser end===========');
 next();
 })
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handler
app.use((err: Error, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err['status'] || 500);
  res.render('error');
});

export default app;