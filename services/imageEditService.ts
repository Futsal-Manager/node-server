/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/

/** External dependencies **/
import ffmpeg = require("fluent-ffmpeg")

/** Internal dependencies **/

export default class ImageEditService {
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
                .on('progress', function(progress) {
                    console.log('Processing: ' + progress.percent + '% done');
                })
                .on('error', function(err) {
                    console.log('An error occurred: ' + err.message);
                    reject(err.message);
                })
                .on('end', function() {
                    console.log('An Merging success');
                    resolve({path: outputPath, name: name});
                })
                .save(outputPath);
        })
    };
}
