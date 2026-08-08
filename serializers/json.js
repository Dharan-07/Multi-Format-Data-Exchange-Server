function serialize(user) {
    return Buffer.from(JSON.stringify(user));
}

function deserialize(buffer) {
    return JSON.parse(buffer.toString());
}

module.exports = {
    serialize,
    deserialize
};