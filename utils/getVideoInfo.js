/**
 * Created by yuhogyun on 2017. 6. 22..
 */
"use strict";
/****
 * External Dependency
 ****/
/****
 * Internal Dependency
 ****/
const ffmpeg = require("fluent-ffmpeg");
function getVideoInfo(filePath) {
    return new Promise((resolve) => {
        ffmpeg(filePath).ffprobe((err, data) => {
            let videoInfo = data['streams'][0];
            resolve({ width: videoInfo['width'], height: videoInfo['height'] });
        });
    });
}
module.exports = getVideoInfo;
