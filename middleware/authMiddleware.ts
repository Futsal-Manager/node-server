/**
 * Created by yuhogyun on 2017. 2. 4..
 */

const AuthMiddleware = {
    userAuthenticated: function(req, res, next) {
        if (req.user) {
            next();
        } else {
            console.log('Auth Failed');
            res.status(500).json({errmsg: err.errmsg});
        }
    }
};

export default AuthMiddleware;
