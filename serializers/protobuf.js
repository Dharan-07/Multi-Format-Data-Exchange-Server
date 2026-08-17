const protobuf = require("protobufjs");


// Load the .proto schema
const root = protobuf.loadSync("./schema/user.proto");


// Get the User message by class name or object name 
const User = root.lookupType("User");


// Convert JavaScript object → Protobuf binary
function serialize(user) {

    const message = User.create(user);

    const buffer = User.encode(message).finish();

    return buffer;
}


// Convert Protobuf binary → JavaScript object
function deserialize(buffer) {

    const message = User.decode(buffer);

    return User.toObject(message, {
        longs: Number,
        enums: String,
        defaults: true
    });
}


module.exports = {
    serialize,
    deserialize
};