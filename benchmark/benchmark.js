const readline = require("readline");

const json = require("../serializers/json");
const protobuf = require("../serializers/protobuf");
const avro = require("../serializers/avro");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter name: ", (name) => {

    rl.question("Enter age: ", (ageInput) => {

        const user = {
            name: name,
            age: Number(ageInput)
        };

        console.log("\nUser:");
        console.log(user);

        // --------------------------------
        // JSON
        // --------------------------------
        const jsonData = json.serialize(user);
        const jsonBuffer = Buffer.from(jsonData);

        // --------------------------------
        // Protobuf
        // --------------------------------
        const protobufBuffer = protobuf.serialize(user);

        // --------------------------------
        // Avro
        // --------------------------------
        const avroBuffer = avro.serialize(user);

        // --------------------------------
        // Payload sizes
        // --------------------------------

        console.log("\nPayload Sizes:");

        console.log("JSON:",jsonBuffer.length,"bytes");

        console.log("Protobuf:",protobufBuffer.length,"bytes");

        console.log("Avro:",avroBuffer.length,"bytes");

        rl.close();
    });
});