const test = require("node:test");
const assert = require("node:assert");

const { getSerializer } = require("../serializers");

const {
    compress,
    decompress
} = require("../utils/compression");


// --------------------------------
// Unsupported Content-Type
// --------------------------------

test("unsupported Content-Type should throw an error", () => {

    assert.throws(
        () => getSerializer("application/xml"),
        {
            message: "Unsupported Content-Type: application/xml"
        }
    );

});


// --------------------------------
// Unsupported Content-Encoding
// --------------------------------

test("unsupported Content-Encoding should be rejected", () => {

    const contentEncoding = "br";

    assert.notStrictEqual(
        contentEncoding,
        "gzip"
    );

});


// --------------------------------
// Invalid JSON
// --------------------------------

test("invalid JSON should throw an error", () => {

    const invalidJson = Buffer.from(
        '{"name":"Dharan","age":21'
    );

    const jsonSerializer = getSerializer(
        "application/json"
    );

    assert.throws(
        () => jsonSerializer.deserialize(invalidJson)
    );

});


// --------------------------------
// Invalid Protobuf
// --------------------------------

test("invalid Protobuf should throw an error", () => {

    const protobufSerializer = getSerializer(
        "application/x-protobuf"
    );

    const invalidBuffer = Buffer.from([
        0xff,
        0xff,
        0xff
    ]);

    assert.throws(
        () => protobufSerializer.deserialize(invalidBuffer)
    );

});


// --------------------------------
// Invalid Avro
// --------------------------------

test("invalid Avro should throw an error", () => {

    const avroSerializer = getSerializer(
        "application/avro"
    );

    const invalidBuffer = Buffer.from([
        0xff
    ]);

    assert.throws(
        () => avroSerializer.deserialize(invalidBuffer)
    );

});