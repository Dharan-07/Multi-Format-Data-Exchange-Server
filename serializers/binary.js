const { serialize, deserialize } = require("./custom");

function serializeBinary(user) {
    const text = serialize(user);      // "Dharan|21"\
    console.log(text)
    return Buffer.from(text, "utf8");  // Buffer
}

function deserializeBinary(buffer) {
    const text = buffer.toString("utf8");
    console.log(text)
    return deserialize(text);
}

module.exports = {
    serializeBinary,
    deserializeBinary
};