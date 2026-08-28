const test = require("node:test");
const assert = require("node:assert");

const jsonSerializer = require("../serializers/json");
const customSerializer = require("../serializers/custom");
const protobufSerializer = require("../serializers/protobuf");
const avroSerializer = require("../serializers/avro");

const user = {
    name: "Dharan",
    age: 21
};


// --------------------------------
// JSON Serializer
// --------------------------------

test("JSON serializer should serialize and deserialize user", () => {

    const buffer = jsonSerializer.serialize(user);

    assert.ok(Buffer.isBuffer(buffer));

    const result = jsonSerializer.deserialize(buffer);

    assert.deepStrictEqual(result, user);

});


// --------------------------------
// Custom Serializer
// --------------------------------

test("Custom serializer should serialize and deserialize user", () => {

    const buffer = customSerializer.serialize(user);

    assert.ok(Buffer.isBuffer(buffer));

    const result = customSerializer.deserialize(buffer);

    assert.deepStrictEqual(result, user);

});


// --------------------------------
// Protocol Buffers
// --------------------------------

test("Protobuf serializer should serialize and deserialize user", () => {

    const buffer = protobufSerializer.serialize(user);

    assert.ok(Buffer.isBuffer(buffer));

    const result = protobufSerializer.deserialize(buffer);

    assert.deepStrictEqual(result, user);

});


// --------------------------------
// Apache Avro
// --------------------------------

test("Avro serializer should serialize and deserialize user", () => {

    const buffer = avroSerializer.serialize(user);

    assert.ok(Buffer.isBuffer(buffer));

    const result = avroSerializer.deserialize(buffer);

    assert.deepStrictEqual(
        {
            name: result.name,
            age: result.age
        },
        user
    );

});