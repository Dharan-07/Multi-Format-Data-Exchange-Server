const avro = require("avsc");
const fs = require("fs");


// Read Avro schema
const schema = JSON.parse(
    fs.readFileSync(
        "./schema/user.avsc",
        "utf8"
    )
);


// Create Avro type
const UserType = avro.Type.forSchema(schema);


// Object → Avro Buffer
function serialize(user) {

    return UserType.toBuffer(user);

}


// Avro Buffer → Object
function deserialize(buffer) {

    return UserType.fromBuffer(buffer);

}


module.exports = {
    serialize,
    deserialize
};