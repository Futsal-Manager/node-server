/**
 * Created by yuhogyun on 2017. 2. 4..
 */

import AuthRouter from './../routes/authRouter'

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

}
