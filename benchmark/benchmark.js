const readline = require("readline");

const json = require("../serializers/json");
const protobuf = require("../serializers/protobuf");
const avro = require("../serializers/avro");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ITERATIONS = 10000;


function measureSerialization(serializer, user) {

    // Warm-up
    for (let i = 0; i < 1000; i++) {
        serializer.serialize(user);
    }

    const start = process.hrtime.bigint();

    let buffer;

    for (let i = 0; i < ITERATIONS; i++) {
        buffer = serializer.serialize(user);
    }

    const end = process.hrtime.bigint();

    const totalTime =
        Number(end - start) / 1_000_000;

    const averageTime =
        totalTime / ITERATIONS;

    return {
        buffer,
        totalTime,
        averageTime
    };
}


function measureDeserialization(serializer, buffer) {

    // Warm-up
    for (let i = 0; i < 1000; i++) {
        serializer.deserialize(buffer);
    }

    const start = process.hrtime.bigint();

    for (let i = 0; i < ITERATIONS; i++) {
        serializer.deserialize(buffer);
    }

    const end = process.hrtime.bigint();

    const totalTime =
        Number(end - start) / 1_000_000;

    const averageTime =
        totalTime / ITERATIONS;

    return {
        totalTime,
        averageTime
    };
}


function printResult(name, serialization, deserialization) {

    console.log("\n----------------------------------------");
    console.log(name);
    console.log("----------------------------------------");

    console.log(
        "Payload Size       :",
        serialization.buffer.length,
        "bytes"
    );

    console.log(
        "Serialize Total    :",
        serialization.totalTime.toFixed(4),
        "ms"
    );

    console.log(
        "Serialize Average  :",
        serialization.averageTime.toFixed(6),
        "ms"
    );

    console.log(
        "Deserialize Total  :",
        deserialization.totalTime.toFixed(4),
        "ms"
    );

    console.log(
        "Deserialize Average:",
        deserialization.averageTime.toFixed(6),
        "ms"
    );
}


rl.question("Enter name: ", (name) => {

    rl.question("Enter age: ", (ageInput) => {

        const user = {
            name: name,
            age: Number(ageInput)
        };


        console.log("\n========================================");
        console.log("        SERIALIZATION BENCHMARK");
        console.log("========================================");

        console.log("\nUser:");
        console.log(user);

        console.log(
            "\nIterations:",
            ITERATIONS
        );


        // ========================================
        // JSON
        // ========================================

        const jsonSerialization =
            measureSerialization(
                json,
                user
            );

        const jsonDeserialization =
            measureDeserialization(
                json,
                jsonSerialization.buffer
            );


        // ========================================
        // PROTOBUF
        // ========================================

        const protobufSerialization =
            measureSerialization(
                protobuf,
                user
            );

        const protobufDeserialization =
            measureDeserialization(
                protobuf,
                protobufSerialization.buffer
            );


        // ========================================
        // AVRO
        // ========================================

        const avroSerialization =
            measureSerialization(
                avro,
                user
            );

        const avroDeserialization =
            measureDeserialization(
                avro,
                avroSerialization.buffer
            );


        // ========================================
        // RESULTS
        // ========================================

        printResult(
            "JSON",
            jsonSerialization,
            jsonDeserialization
        );

        printResult(
            "PROTOBUF",
            protobufSerialization,
            protobufDeserialization
        );

        printResult(
            "AVRO",
            avroSerialization,
            avroDeserialization
        );


        console.log("\n========================================");
        console.log("Benchmark completed");
        console.log("========================================");


        rl.close();

    });

});