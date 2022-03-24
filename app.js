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


server.listen(8080, function () {
  console.log(`Listening on http://localhost:8080`);
    // /Applications/Firefox.app/Contents/MacOS/firefox -kiosk https://www.google.com
    const { exec } = require('child_process');
    exec('"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" --kiosk http://localhost:8080 --edge-kiosk-type=fullscreen', (error, stdout, stderr) => { 
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    });
});
