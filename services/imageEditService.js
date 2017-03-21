/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
const ffmpeg = require("fluent-ffmpeg");
/** Internal dependencies **/
class ImageEditService {
    constructor() {
    }
    // ffmpeg 타입으로 영상 반환
    static setVideo(viedeoPath) {
        return ffmpeg(viedeoPath);
    }
    // 영상 자르기
    static trimVideo(ffmpegFormat, beginTime, duration) {
        return ffmpegFormat
            .setStartTime(beginTime)
            .setDuration(duration);
    }
    // 음악 삽입
    /**
     *
     * @param ffmpegFormat
     * @param musicPath
     * @param outputPath
     * @param name
     * @returns {Promise<T>} {path: '경로', name: '파일 이름'}
     */
    static mergeMusic(ffmpegFormat, musicPath, outputPath, name) {
        return new Promise((resolve, reject) => {
            ffmpegFormat.addInput(musicPath)
                .on('progress', function (progress) {
                console.log('Processing: ' + progress.percent + '% done');
            })
                .on('error', function (err, stdout, stderr) {
                console.log('An error occurred: ' + err.message);
                console.log("ffmpeg stdout:\n" + stdout);
                console.log("ffmpeg stderr:\n" + stderr);
                reject(err.message);
            })
                .on('end', function () {
                console.log('An Merging success');
                resolve({ path: outputPath, name: name });
            })
                .save(outputPath);
            /**
             * Todo: reference: http://stackoverflow.com/questions/32931685/the-encoder-aac-is-experimental-but-experimental-codecs-are-not-enabled
             */
        });
    }
    ;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageEditService;
