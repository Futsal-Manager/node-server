/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/
"use strict";
/** External dependencies **/
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const randomstring = require("randomstring");
/** Internal dependencies **/
const dbModel_1 = require("./dbModel");
let selectRandomMusic = require("./../utils/selectRandomMusic");
let getLastBeforeOneSecondsFrame = require('./../utils/getOneSecondsFrame');
let getVideoInfo = require('./../utils/getVideoInfo');
const rootPath_1 = require("./../rootPath");
const PROCESSING_TYPE = {
    SPLIT_VIDEO: 'SPLIT Video',
    FADE_EFFECT: 'FADE Effect',
    MERGE_VIDEO: 'Merge Video',
    INPUT_MUSIC: 'INPUT MUSIC',
    TEXT_INSERT: 'TEXT Insert'
};
class ImageEditService {
    constructor() {
    }
    static extractHighlightByTimeArr(filePath, _timeArr, outputPath, skipTime = 0) {
        console.log('extract highlight from', filePath);
        return new Promise((resolve, reject) => {
            let shouldRemoveFileList = [];
            // Promise chain으로 되어야 함
            /**
             * Processing Order
             * 1. split (v)
             * 2. merge video (v)
             * 3. add music (v)
             * 4. add fadeOut, fadeIn (v)
             */
            let timeArr = []; // [{startAt: '00:00',duration: '00:20'}]
            let totalDurationSec = 0;
            for (let i of _timeArr) {
                let startOfDay = moment().startOf('day');
                let now = startOfDay.clone().set({ seconds: i[0] });
                let afterSeconds = startOfDay.clone().set({ seconds: i[1] });
                let durationSeconds = afterSeconds.diff(now, 'seconds');
                totalDurationSec += durationSeconds;
                let formattedDurationSeconds = startOfDay.clone().set({ seconds: durationSeconds }).format('HH:mm:ss');
                let pushToArrJson = {
                    startAt: now.format('HH:mm:ss'),
                    duration: formattedDurationSeconds,
                };
                timeArr.push(pushToArrJson);
            }
            let selectedMusic;
            let fadeEffectedVideoArr = [];
            let mergedPath = __dirname + '/../merged' + path.basename(filePath, '.mp4') + '.mp4';
            // Progress 1. Select Random Music
            selectRandomMusic().then((music) => {
                selectedMusic = music;
                // Progress 2. Split Video
                return splitVideo(filePath, timeArr, skipTime);
            }).then((_splittedFilePathArr) => {
                let promiseArr = [];
                // For Remove File
                shouldRemoveFileList = shouldRemoveFileList.concat(_splittedFilePathArr);
                _splittedFilePathArr.forEach((_splittedFilePath) => {
                    let randomEffectVideoName = randomstring.generate(3) + _splittedFilePath;
                    shouldRemoveFileList.push(randomEffectVideoName);
                    fadeEffectedVideoArr.push(randomEffectVideoName);
                    let p = fadeEffectVideo(_splittedFilePath, randomEffectVideoName);
                    promiseArr.push(p);
                });
                // Progress 3. Fade Effect
                return Promise.all(promiseArr);
            }).then((fadeEffectedVideoArr) => {
                // For Remove File
                shouldRemoveFileList.push(mergedPath);
                // Progress 4. Merge Video
                return mergeVideo(fadeEffectedVideoArr, mergedPath);
            }).then(() => {
                // Progress 5. Input Music
                return inputMusic(mergedPath, selectedMusic, outputPath, totalDurationSec);
            }) /*.then((musicVideo) => {
                shouldRemoveFileList.push(musicVideo);
                return drawText(musicVideo)
            })*/
                .then((textVideo) => {
                resolve(textVideo);
                _removeFiles(shouldRemoveFileList);
            }).catch((err) => {
                reject(err);
                console.log(err);
                _removeFiles(shouldRemoveFileList);
            });
        });
    }
    static saveHighlightToDb(s3url, email) {
        return new Promise((resolve, reject) => {
            let highlightFileInstance = new dbModel_1.HighlightFileModel({ username: email, s3url: s3url });
            highlightFileInstance.save().then(() => {
                resolve(s3url);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageEditService;
/**
 * @param originalVideoPath: Split할 Video Path
 * @param timeArr: 시작시간, duration이 있는 배열
 * @param skipTime: 생량할 앞부분의 시간
 * @returns {*}
 */
function splitVideo(originalVideoPath, timeArr, skipTime = 0) {
    console.log('split started');
    console.log('split originalVideoPath', originalVideoPath);
    console.log('split timeArr', timeArr);
    return new Promise((resolve, reject) => {
        let fileNameArr = [];
        // File name is randomstring + file Index + '.mp4'
        timeArr.forEach((key, index) => {
            fileNameArr.push(randomstring.generate(4) + 'split' + index + '.mp4');
        });
        console.log('fileNameArr split is', fileNameArr);
        let outputFFmpeg = ffmpeg(originalVideoPath)
            .seekInput(skipTime);
        // split video with time and duration.
        for (let i = 0; i < fileNameArr.length; i++) {
            outputFFmpeg = _addDurationOutput(outputFFmpeg, fileNameArr[i], timeArr[i].startAt, timeArr[i].duration);
        }
        // ADD ON PROGRESS EVENT
        let addedProgressEvent = _addOnProgress(outputFFmpeg);
        // ADD ON ERROR EVENT
        let addedErrorEvent = _addOnErrorEvent(addedProgressEvent, reject);
        // ADD ON END EVENT
        let addedEndEvent = _addOnEndEvent(addedErrorEvent, PROCESSING_TYPE.SPLIT_VIDEO, resolve, fileNameArr);
        addedEndEvent.run();
    });
}
function fadeEffectVideo(splittedFilePath, outputFilePath) {
    return new Promise((resolve, reject) => {
        _addFadeEffect(splittedFilePath, outputFilePath).then((outputFfmpeg) => {
            // ADD ON PROGRESS EVENT
            let addedProgressEvent = _addOnProgress(outputFfmpeg);
            // ADD ON ERROR EVENT
            let addedErrorEvent = _addOnErrorEvent(addedProgressEvent, reject);
            // ADD ON END EVENT
            let addedEndEvent = _addOnEndEvent(addedErrorEvent, PROCESSING_TYPE.FADE_EFFECT, resolve, outputFilePath);
            addedEndEvent.run();
        });
    });
}
/**
 * Progress 2. Merge the splitted Video
 * @param splittedPathArr
 * @param outputPath
 * @returns {*}
 */
function mergeVideo(splittedPathArr, outputPath) {
    return new Promise((resolve, reject) => {
        let outputFfmpeg = ffmpeg();
        for (let i = 0; i < splittedPathArr.length; i++) {
            outputFfmpeg = _addInput(outputFfmpeg, splittedPathArr[i]);
        }
        // ADD ON PROGRESS EVENT
        let addedProgressEvent = _addOnProgress(outputFfmpeg);
        // ADD ON ERROR EVENT
        let addedErrorEvent = _addOnErrorEvent(addedProgressEvent, reject);
        // ADD ON END EVENT
        let addedEndEvent = _addOnEndEvent(addedErrorEvent, PROCESSING_TYPE.MERGE_VIDEO, resolve, outputPath);
        // execute merge, don't need to run() command. it executed directly
        addedEndEvent.mergeToFile(outputPath, './tempDir');
    });
}
/**
 * Progress 3. Input Music
 * @param splittedPathArr
 * @param outputPath
 * @returns {*}
 */
function inputMusic(filePathArr, musicPath, outputPath, totalDurationSec) {
    console.log('inputMusic start');
    console.log('filePathArr', filePathArr);
    console.log('musicPath', musicPath);
    console.log('outputPath', outputPath);
    return new Promise((resolve, reject) => {
        let musicVideo = ffmpeg()
            .addInput(musicPath)
            .addInput(filePathArr)
            .duration(totalDurationSec);
        // ADD ON PROGRESS EVENT
        let addedProgressEvent = _addOnProgress(musicVideo);
        // ADD ON ERROR EVENT
        let addedErrorEvent = _addOnErrorEvent(addedProgressEvent, reject);
        // ADD ON END EVENT
        let addedEndEvent = _addOnEndEvent(addedErrorEvent, PROCESSING_TYPE.INPUT_MUSIC, resolve, outputPath);
        // execute input misic, don't need to run() command. it executed directly
        addedEndEvent.save(outputPath);
    });
}
function drawText(_filePath) {
    let outputPath = rootPath_1.default + '/' + Date.now() + path.basename(_filePath, '.mp4') + '.mp4';
    console.log('drawText source: ', _filePath);
    console.log('result: ', outputPath);
    return new Promise((resolve, reject) => {
        let textFilter = {
            filter: 'drawtext',
            options: {
                fontfile: rootPath_1.default + '/assets/fonts/arial.ttf',
                text: 'Futsal Manager\n' + moment().format('YYYY-MM-DD'),
                fontsize: 20,
                fontcolor: 'white',
                x: '(main_w/2-text_w/2)',
                y: '(main_h/2-text_h/2)',
                shadowcolor: 'black',
                shadowx: 2,
                shadowy: 2,
                enable: 'between(t,0,0.5)'
            },
        };
        let musicVideo = ffmpeg(_filePath)
            .videoFilters(textFilter)
            .output(outputPath);
        // ADD ON PROGRESS EVENT
        let addedProgressEvent = _addOnProgress(musicVideo);
        // ADD ON ERROR EVENT
        let addedErrorEvent = _addOnErrorEvent(addedProgressEvent, reject);
        // ADD ON END EVENT
        let addedEndEvent = _addOnEndEvent(addedErrorEvent, PROCESSING_TYPE.TEXT_INSERT, resolve, outputPath);
        console.log('draw working...');
        // execute input misic, don't need to run() command. it executed directly
        addedEndEvent.run();
    });
}
/**
 * Input file for 1. Split video
 * @param _ffmpeg
 * @param _filePath
 * @returns {*}
 */
function _addInput(_ffmpeg, _filePath) {
    return _ffmpeg
        .input(_filePath);
}
function _addFadeEffect(_filePath, _outputFilePath) {
    return new Promise((resolve) => {
        getLastBeforeOneSecondsFrame(_filePath).then((lastBeforeOneSecondsFrame) => {
            let output = ffmpeg(_filePath)
                .videoFilters({ filter: 'fade', options: ['in', 0, 30] }) // fade in
                .videoFilters({ filter: 'fade', options: ['out', lastBeforeOneSecondsFrame, 30] }) // fade out
                .output(_outputFilePath);
            resolve(output);
        });
    });
}
/**
 * Duration output for 1. Split video
 * @param _ffmpeg
 * @param _fileName
 * @param _startAt
 * @param _duration
 * @returns {*}
 */
function _addDurationOutput(_ffmpeg, _fileName, _startAt, _duration) {
    return _ffmpeg
        .output(_fileName)
        .seek(_startAt)
        .duration(_duration);
}
/**
 * Progress Event Handler for ffmpeg Progress 1,2,3
 * @param _ffmpeg
 * @returns {*}
 */
function _addOnProgress(_ffmpeg) {
    return _ffmpeg.on('progress', function (progress) {
        console.log('Processing: ' + progress.percent + '% done');
    });
}
/**
 * End Event handler for ffmpeg Progress 1,2,3
 * @param _ffmpeg
 * @param processingType
 * @param resolve
 * @param resolvePath
 * @returns {*}
 */
function _addOnEndEvent(_ffmpeg, processingType, resolve, resolvePath) {
    return _ffmpeg.on('end', function () {
        console.log('End Prosessing for ' + processingType);
        resolve(resolvePath);
    });
}
/**
 * Error Event handler for ffmpeg Progress 1,2,3
 * @param _ffmpeg
 * @param reject
 * @returns {*}
 */
function _addOnErrorEvent(_ffmpeg, reject) {
    return _ffmpeg.on('error', function (err) {
        console.log('error occurred' + err);
        reject(err);
    });
}
function _removeFiles(_shouldRemoveFileList) {
    for (let removingFile of _shouldRemoveFileList) {
        fs.unlinkSync(removingFile);
    }
}
