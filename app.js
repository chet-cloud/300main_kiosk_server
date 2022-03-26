'use strict';

import express from 'express'
import { createServer } from 'http'
import { FileServer } from 'files_as_stream'
import { exec } from 'child_process';

const app = express();
app.use(express.static('./public'));
app.use(express.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
});

const server = createServer(app);

app.get("/video/mp4/:name", function (req, res) {
  const name = req.params['name']
  FileServer("./public/mp4/" + name, req, res)
})



server.listen(8080, function () {
  console.log(`Listening on http://localhost:8080`);
  // /Applications/Firefox.app/Contents/MacOS/firefox -kiosk https://www.google.com

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
