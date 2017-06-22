/**
 * Created by yuhogyun on 2017. 6. 22..
 */

/****
 * External Dependency
 ****/

/****
 * Internal Dependency
 ****/
import ffmpeg = require('fluent-ffmpeg');

function getLastBeforeOneSecondsFrame(filePath) {
    return new Promise((resolve) => {
        ffmpeg(filePath).ffprobe((err, data) => {
            let videoInfo = data['streams'][0];
            let frameLength = parseFloat(videoInfo['nb_frames']); // 동영상 길이 (초)
            let durationSeconds = parseFloat(videoInfo['duration']);

            // console.log('frameLength is', frameLength);
            // console.log('durationSeconds is', durationSeconds);
            let oneSecondsFrame = frameLength / durationSeconds;

            // 마지막 1초전 프레임
            let lastBeforeOneSecondsFrame = Math.round(frameLength - oneSecondsFrame);
            console.log('last seconds' + lastBeforeOneSecondsFrame / oneSecondsFrame);
            resolve(lastBeforeOneSecondsFrame);
        })
    });
}

module.exports = getLastBeforeOneSecondsFrame;