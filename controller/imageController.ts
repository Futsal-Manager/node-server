/**
 * Copyright (c) 2016 timeros - Project
 *
 * @author yuhogyun
 **/

/** External dependencies **/

/** Internal dependencies **/
import ImageEditService from './../services/imageEditService';
import MusicPath from './../constants/musicPath';
import VIDEO_CONFIG from './../videoConfig';

export default class ImageController {
    constructor() {

    }

    /**
     * extract Highlight Video and merge music
     * @param videoPath 업로드된 비디오의 경로
     * @returns {Promise<T>} resolve: 프로세싱된 비디오, reject: 에러 메시지
     */
    static async extractHighlight(videoPath) {
        let ffmpegVideo = ImageEditService.setVideo(videoPath);

        // Todo: For now startTime and durationTime is hard coded. Need to set up paramerize.
        let startTime = '0:30';
        let durationTime = '2:00';

        let trimedVideo = ImageEditService.trimVideo(ffmpegVideo, startTime, durationTime);
        let outputName = Date() + '.mp4';
        let outputPath = VIDEO_CONFIG.OUTPUT_DIR + outputName; // 'futsal-server/processedFiles/'

        return await ImageEditService.mergeMusic(trimedVideo, MusicPath.bgm1, outputPath, outputName);
    }
}
