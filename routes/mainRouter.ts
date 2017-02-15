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
        res.status(200).json({res: 'Futsal Manager server'});
    }
}
