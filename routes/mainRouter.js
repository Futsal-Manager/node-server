/**
 * Copyright (c) 2016 timeros - project
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
/** Internal dependencies **/
class MainRouter {
    constructor() {
    }
    static index(req, res) {
        res.status(200).json({ res: 'Futsal Manager server' });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainRouter;
