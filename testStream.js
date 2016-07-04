var fs = require('fs');
var readStream = fs.createReadStream('');
var writeStream = fs.createWriteStream('');

fs.createReadStream('/path/to/source').pipe(fs.createWriteStream('/path/to/dest'));

readStream.on('data', function(chunk) {
    // writeStream.write(chunk);
    if (writeStream.write(chunk) === false) {
        readStream.pause();
    }
});

writeStream.on('drain', function() {
    readStream.resume();
});

readStream.on('end', function() {
    writeStream.end();
});