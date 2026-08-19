const zlib = require("zlib");

// Compress Buffer
function compress(buffer) {
    return zlib.gzipSync(buffer);
}

// Decompress Buffer
function decompress(buffer) {
    return zlib.gunzipSync(buffer);
}


module.exports = {
    compress,
    decompress
};