const test = require("node:test");
const assert = require("node:assert");

const {
    compress,
    decompress
} = require("../utils/compression");


// --------------------------------
// Compression
// --------------------------------

test("compress should return a Buffer", () => {

    const original = Buffer.from("Hello Dharan");

    const compressed = compress(original);

    assert.ok(Buffer.isBuffer(compressed));

});


// --------------------------------
// Compression Round Trip
// --------------------------------

test("compressed data should decompress to original data", () => {

    const original = Buffer.from("Hello Dharan");

    const compressed = compress(original);
    const decompressed = decompress(compressed);

    assert.deepStrictEqual(
        decompressed,
        original
    );

});


// --------------------------------
// JSON Payload
// --------------------------------

test("JSON payload should survive compression round trip", () => {

    const user = {
        name: "Dharan",
        age: 21
    };

    const original = Buffer.from(
        JSON.stringify(user)
    );

    const compressed = compress(original);
    const decompressed = decompress(compressed);

    const result = JSON.parse(
        decompressed.toString()
    );

    assert.deepStrictEqual(
        result,
        user
    );

});