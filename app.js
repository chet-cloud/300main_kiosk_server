'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json())
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

const server = createServer(app);

app.post("/test", (req, res) => {
  return res.json({ok:true})
})

// https://github.com/thesmartcoder7/video_streaming_server/blob/main/index.js
app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
      res.status(400).send("Requires Range header");
  }

  const videoPath = "Chris-Do.mp4";
  const videoSize = fs.statSync("Chris-Do.mp4").size;

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});



server.listen(8080, function () {
  console.log(`Listening on http://localhost:8080`);
    // /Applications/Firefox.app/Contents/MacOS/firefox -kiosk https://www.google.com
    const { exec } = require('child_process');
    //exec('"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" --kiosk http://localhost:8080 --edge-kiosk-type=fullscreen', (error, stdout, stderr) => { 
    // exec('/Applications/Firefox.app/Contents/MacOS/firefox -kiosk http://localhost:8080', (error, stdout, stderr) => { 
    // if (error) {
    //     console.error(`exec error: ${error}`);
    //     return;
    // }
    // console.log(`stdout: ${stdout}`);
    // console.error(`stderr: ${stderr}`);
    // });
});
