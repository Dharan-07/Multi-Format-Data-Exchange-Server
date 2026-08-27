const http = require("http");
const { serialize, deserialize } = require("../serializers/protobuf");
const readline = require("readline");
const { compress, decompress } = require("../utils/compression");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function sendUser() {

    rl.question("Enter name: ", (name) => {

        rl.question("Enter age: ", (ageInput) => {

            const user = {
                name: name,
                age: Number(ageInput)
            };


            console.log("\nUser:");
            console.log(user);


            // --------------------------------
            // Serialize
            // --------------------------------

            const buffer = serialize(user);
            const compressedBuffer = compress(buffer);


            console.log("Original Buffer:");
            console.log(buffer);

            console.log("Original Size:");
            console.log(buffer.length);

            console.log("\nCompressed Buffer:");
            console.log(compressedBuffer);

            console.log("Compressed Size:");
            console.log(compressedBuffer.length);


            console.log("\nBuffer as array:");
            console.log([...buffer]);


            console.log("\nBuffer as hex:");
            console.log(
                buffer.toString("hex")
            );


            console.log("\nBuffer as binary:");

            console.log(
                [...buffer]
                    .map(byte =>
                        byte
                            .toString(2)
                            .padStart(8, "0")
                    )
                    .join(" ")
            );


            // --------------------------------
            // HTTP Request
            // --------------------------------

            const options = {
                hostname: "localhost",
                port: 4000,
                path: "/user",
                method: "POST",
                headers: {

                    "Content-Type":
                        "application/x-protobuf",

                    "Content-Encoding": "gzip",

                    "Accept-Encoding": "gzip",

                    "Content-Length": compressedBuffer.length
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

                        console.log("\nServer status:");
                        console.log(res.statusCode);

                        // Server returned an error
                        if (res.statusCode >= 400) {

                            console.log(
                                "\nServer Error:"
                            );

                            console.log(
                                responseBuffer.toString()
                            );

                            rl.close();

                            return;
                        }

                        // Successful response
                        let responseData =
                            responseBuffer;

                        if (
                            res.headers["content-encoding"] === "gzip"
                        ) {

                            responseData =
                                decompress(responseBuffer);
                        }

                        console.log(
                            "\nServer response:"
                        );

                        console.log(responseData);

                        let responseUser;
                        try {
                            responseUser = deserialize(responseData);
                        } catch (err) {
                            console.log("\nFailed to decode response:", err.message);
                            rl.close();
                            return;
                        }

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
            // Send binary buffer
            req.write(compressedBuffer);

            req.end();
        });
    });
}
sendUser();