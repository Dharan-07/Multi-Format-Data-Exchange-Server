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


        console.log("\n================================");
        console.log("User");
        console.log("================================");

        console.log(user);


        // =================================
        // JSON
        // =================================

        console.log("\n================================");
        console.log("JSON");
        console.log("================================");


        const jsonStart =
            process.hrtime.bigint();

        const jsonData =
            json.serialize(user);

        const jsonBuffer =
            Buffer.from(jsonData);

        const jsonEnd =
            process.hrtime.bigint();


        const jsonSerializeTime =
            Number(jsonEnd - jsonStart) / 1_000_000;


        console.log(
            "Payload Size:",
            jsonBuffer.length,
            "bytes"
        );

        console.log(
            "Serialize Time:",
            jsonSerializeTime,
            "ms"
        );


        // JSON Deserialize

        const jsonDeserializeStart =
            process.hrtime.bigint();

        const jsonUser =
            json.deserialize(jsonBuffer);

        const jsonDeserializeEnd =
            process.hrtime.bigint();


        const jsonDeserializeTime =
            Number(
                jsonDeserializeEnd -
                jsonDeserializeStart
            ) / 1_000_000;


        console.log(
            "Deserialize Time:",
            jsonDeserializeTime,
            "ms"
        );


        // =================================
        // PROTOBUF
        // =================================

        console.log("\n================================");
        console.log("PROTOBUF");
        console.log("================================");


        const protobufSerializeStart =
            process.hrtime.bigint();

        const protobufBuffer =
            protobuf.serialize(user);

        const protobufSerializeEnd =
            process.hrtime.bigint();


        const protobufSerializeTime =
            Number(
                protobufSerializeEnd -
                protobufSerializeStart
            ) / 1_000_000;


        console.log(
            "Payload Size:",
            protobufBuffer.length,
            "bytes"
        );

        console.log(
            "Serialize Time:",
            protobufSerializeTime,
            "ms"
        );


        // Protobuf Deserialize

        const protobufDeserializeStart =
            process.hrtime.bigint();

        const protobufUser =
            protobuf.deserialize(protobufBuffer);

        const protobufDeserializeEnd =
            process.hrtime.bigint();


        const protobufDeserializeTime =
            Number(
                protobufDeserializeEnd -
                protobufDeserializeStart
            ) / 1_000_000;


        console.log(
            "Deserialize Time:",
            protobufDeserializeTime,
            "ms"
        );


        // =================================
        // AVRO
        // =================================

        console.log("\n================================");
        console.log("AVRO");
        console.log("================================");


        const avroSerializeStart =
            process.hrtime.bigint();

        const avroBuffer =
            avro.serialize(user);

        const avroSerializeEnd =
            process.hrtime.bigint();


        const avroSerializeTime =
            Number(
                avroSerializeEnd -
                avroSerializeStart
            ) / 1_000_000;


        console.log(
            "Payload Size:",
            avroBuffer.length,
            "bytes"
        );

        console.log(
            "Serialize Time:",
            avroSerializeTime,
            "ms"
        );


        // Avro Deserialize

        const avroDeserializeStart =
            process.hrtime.bigint();

        const avroUser =
            avro.deserialize(avroBuffer);

        const avroDeserializeEnd =
            process.hrtime.bigint();


        const avroDeserializeTime =
            Number(
                avroDeserializeEnd -
                avroDeserializeStart
            ) / 1_000_000;


        console.log(
            "Deserialize Time:",
            avroDeserializeTime,
            "ms"
        );


        // =================================
        // RESULT
        // =================================

        console.log("\n================================");
        console.log("BENCHMARK RESULT");
        console.log("================================");

        console.log(
            "\nJSON:",
            jsonBuffer.length,
            "bytes"
        );

        console.log(
            "Protobuf:",
            protobufBuffer.length,
            "bytes"
        );

        console.log(
            "Avro:",
            avroBuffer.length,
            "bytes"
        );


        rl.close();

    });

});