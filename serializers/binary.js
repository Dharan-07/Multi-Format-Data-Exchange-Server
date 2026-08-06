const { serialize, deserialize } = require('./custom')

function serializeBinary(user) {

    const text = serialize(user);
    return Buffer.from(text);

}

function deserializeBinary(buffer) {

    const text = buffer.toString();
    return deserialize(text);

}

module.exports = {
    serializeBinary,
    deserializeBinary
};