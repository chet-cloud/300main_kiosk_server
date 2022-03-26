const splitFile = require('split-file');
const glob = require("glob");
const fs = require("fs");

var getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};

const size = 1024 * 1024 * 50 //50m

getDirectories('./public', function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    res.filter((f)=>f.endsWith(".mp4")).forEach(mp4 => {
      if(fs.lstatSync(mp4).size > size){
        splitFile.splitFileBySize(mp4, size)
        .then((names) => {
          console.log(names);
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
      }
    });
  }
});


