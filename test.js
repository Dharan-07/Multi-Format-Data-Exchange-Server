const {
    serializeBinary,
    deserializeBinary
} = require("./serializers/binary");

const user = {

    name: "Dharan",

    age: 21

};

const buffer = serializeBinary(user);

console.log(buffer);

const result = deserializeBinary(buffer);

console.log(result);

//----------------------------------------------------------------------

// const text = "Dharan|21";

// const buffer = Buffer.from(text);

// console.log(buffer);

// console.log(buffer.length);

// console.log(buffer.toString());

// console.log(buffer[0]);

// console.log(buffer[1]);

// console.log(buffer[2]);