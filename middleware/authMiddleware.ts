/**
 * Created by yuhogyun on 2017. 2. 4..
 */

import AuthRouter from './../routes/authRouter'
import Config from './../config'


export default class AuthMiddleware {
    constructor() {

    }

    static userAuthenticated(req, res, next) {
        if (req.user) {
            next();
        } else {
            console.log('Auth Failed');
            AuthRouter.fail(req,res);
        }
    }

    static serverAuthenticated(req, res, next) {
        if (req.body['token'] === Config.PROTOCOL_TOKEN) {
            next();
        } else {
            console.log('Server Auth Failed');
            AuthRouter.fail(req,res);
        }
    }

}
