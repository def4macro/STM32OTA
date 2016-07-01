var fs = require('fs'),
    path = require('path'),
    out = process.stdout;

var filePath = '/home/otss/Documents/tmp/B.mp4';

var readStream = fs.createReadStream(filePath);
var writeStream = fs.createWriteStream('B2.mp4');

var state = fs.statSync(filePath);

var totalSize = state.size;
var passedLength = 0;
var lastSize = 0;
var startTime = Date.now();

readStream.on('data', function (chunk) {
    passedLength += chunk.length;
    if (writeStream.write(chunk) === false) {
        readStream.pause();
    }
});

readStream.on('end', function () {
    writeStream.end();
});

writeStream.on('drain', function () {
    readStream.resume();
});

setTimeout(function show() {
    var percent = Math.ceil((passedLength / totalSize) * 100);
    var size = Math.ceil(passedLength / 1000000);
    var diff = size - lastSize;
    lastSize = size;
    out.clearLine();
    out.cursorTo(0);
    out.write('已完成' + size + 'MB, ' + percent + '%, 速度: ' + diff * 2 + 'MB/S');
    if (passedLength < totalSize) {
        setTimeout(show, 500);
    } else {
        var endTime = Date.now();
        console.log();
        console.log('共用时: ' + (endTime - startTime) / 1000 + '秒。');
    }
})