/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** External dependencies **/
/** Internal dependencies **/
const imageEditService_1 = require("./../services/imageEditService");
const musicPath_1 = require("./../constants/musicPath");
const videoConfig_1 = require("./../videoConfig");
class ImageController {
    constructor() {
    }
    /**
     * extract Highlight Video and merge music
     * @param videoPath 업로드된 비디오의 경로
     * @returns {Promise<T>} resolve: 프로세싱된 비디오, reject: 에러 메시지
     */
    static extractHighlight(videoPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let ffmpegVideo = imageEditService_1.default.setVideo(videoPath);
            // Todo: For now startTime and durationTime is hard coded. Need to set up paramerize.
            let startTime = '0:30';
            let durationTime = '2:00';
            /*
             let a = {
             time: [
             {
             startTime: '0:30',
             durationTime: '0:20'
             },
             {
             startTime: '0:50',
             durationTime: '0:20'
             }
             ]
             }
             */
            let trimedVideo = imageEditService_1.default.trimVideo(ffmpegVideo, startTime, durationTime);
            let outputName = Date() + '.mp4';
            let outputPath = videoConfig_1.default.OUTPUT_DIR + outputName; // 'futsal-server/processedFiles/'
            return yield imageEditService_1.default.mergeMusic(trimedVideo, musicPath_1.default.bgm1, outputPath, outputName);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageController;
