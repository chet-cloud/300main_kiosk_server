var MultiStream = require('multistream')
var fs = require('fs')
var slice = require('stream-slice').slice;

var streams = [
  fs.createReadStream('test/1.txt'),
  fs.createReadStream('test/2.txt'),
  fs.createReadStream('test/3.txt')
]

new MultiStream(streams).pipe(slice(10, 19)).pipe(process.stdout) // => 123





