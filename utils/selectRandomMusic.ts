const musicFolder = "/assets/music/"
const musicFolderPath = __dirname + "/.." +musicFolder;

import fs = require('fs');
import rootDir from './../rootPath';


function selectRandomMusic() {
    return new Promise((resolve) => {
        fs.readdir(musicFolderPath, (err, files) => {
            let musicArr = [];
            files.forEach(file => {
                musicArr.push(file);
            });
            let randomIdx = Math.floor((Math.random() * musicArr.length));
            // console.log(rootDir + musicFolder +musicArr[randomIdx]);
            resolve(rootDir + musicFolder +musicArr[randomIdx]);
        });
    })
}

module.exports = selectRandomMusic;