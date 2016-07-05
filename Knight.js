var stream = require('stream');
var util = require('util');

function Knight() {
    stream.Transform.call(this);
}
util.inherits(Knight, stream.Transform);

Knight.prototype._transform = function(chunk, encoding, callback) {
    var upperChunk = chunk.toString().toUpperCase();
    this.push(upperChunk);
    callback();
};

Knight.prototype._flush = function(callback) {
    this.push('dark knight');
    this.push('\n');
    callback();
};

module.exports = Knight;