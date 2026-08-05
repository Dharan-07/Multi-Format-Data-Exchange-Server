const { serialize, deserialize } = require("./serializers/custom");

const user = {
    name: "Alice",
    age: 22
};

const serialized = serialize(user);

console.log(serialized);

const deserialized = deserialize(serialized);

console.log(deserialized);