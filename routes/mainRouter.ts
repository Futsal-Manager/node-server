/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/

export default class MainRouter {
    constructor() {

    }

    static index(req, res) {
        if(req.user) res.status(200).json({res: 'HI Futsal manager', user: req.user})
        else res.status(200).json({res: 'Futsal Manager server running'})
    }
}
