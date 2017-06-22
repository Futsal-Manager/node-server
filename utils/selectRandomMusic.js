"use strict";
const musicFolder = "/assets/music/";
const musicFolderPath = __dirname + "/.." + musicFolder;
const fs = require("fs");
const rootPath_1 = require("./../rootPath");
function selectRandomMusic() {
    return new Promise((resolve) => {
        fs.readdir(musicFolderPath, (err, files) => {
            let musicArr = [];
            files.forEach(file => {
                musicArr.push(file);
            });
            let randomIdx = Math.floor((Math.random() * musicArr.length));
            // console.log(rootDir + musicFolder +musicArr[randomIdx]);
            resolve(rootPath_1.default + musicFolder + musicArr[randomIdx]);
        });
    });
}
module.exports = selectRandomMusic;
