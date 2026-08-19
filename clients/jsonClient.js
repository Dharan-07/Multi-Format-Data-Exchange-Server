const http = require("http");
const readline = require("readline");

const {
    serialize,
    deserialize
} = require("../serializers/json");

const {
    compress,
    decompress
} = require("../utils/compression");

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
        // 1. Serialize
        // --------------------------------
        const buffer = serialize(user);

        console.log("\nOriginal Buffer:");
        console.log(buffer);

        console.log("\nOriginal Size:");
        console.log(buffer.length);

        // --------------------------------
        // 2. Compress
        // --------------------------------

        const compressedBuffer =
            compress(buffer);

        console.log("\nCompressed Buffer:");
        console.log(compressedBuffer);

        console.log("\nCompressed Size:");
        console.log(compressedBuffer.length);

        // --------------------------------
        // 3. HTTP Request
        // --------------------------------
        const options = {
            hostname: "localhost",
            port: 4000,
            path: "/user",
            method: "POST",
            headers: {

                "Content-Type":
                    "application/json",

                "Content-Encoding":
                    "gzip",

                "Content-Length":
                    compressedBuffer.length

            }
        };

        const req =
            http.request(options, (res) => {

                const chunks = [];

                res.on("data", (chunk) => {

                    chunks.push(chunk);

                });

                res.on("end", () => {

                    const responseBuffer =
                        Buffer.concat(chunks);

                    console.log(
                        "\nServer status:"
                    );

                    console.log(res.statusCode);

                    console.log(
                        "\nCompressed Server Response:"
                    );

                    console.log(responseBuffer);

                    // --------------------------------
                    // 4. Decompress response
                    // --------------------------------
                    const decompressedResponse =
                        decompress(responseBuffer);

                    console.log(
                        "\nDecompressed Response:"
                    );

                    console.log(
                        decompressedResponse
                    );

                    // --------------------------------
                    // 5. Deserialize
                    // --------------------------------
                    const responseUser =
                        deserialize(
                            decompressedResponse
                        );

                    console.log(
                        "\nDecoded response:"
                    );

                    console.log(responseUser);
                    rl.close();
                });
            });

        req.on("error", (error) => {

            console.log(
                "Request error:",
                error
            );
            rl.close();
        });

        // Send compressed data
        req.write(compressedBuffer);

        req.end();

    });
});