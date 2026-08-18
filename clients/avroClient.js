const http = require("http");
const readline = require("readline");

const {
    serialize,
    deserialize
} = require("../serializers/avro");


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


            // Object → Avro → Buffer
            const buffer = serialize(user);


            console.log("\nSending Avro Buffer:");
            console.log(buffer);


            const options = {
                hostname: "localhost",
                port: 4000,
                path: "/user",
                method: "POST",
                headers: {

                    "Content-Type":
                        "application/avro",

                    "Content-Length":
                        buffer.length
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
                            "\nServer response:"
                        );

                        console.log(
                            responseBuffer
                        );

                        // Avro Buffer → Object
                        const responseUser =
                            deserialize(
                                responseBuffer
                            );

                        console.log(
                            "\nDecoded response:"
                        );

                        console.log(
                            responseUser
                        );

                        rl.close();

                    });
                });

            req.on("error", (error) => {

                console.log(
                    "Request error:",
                    error.message
                );

                rl.close();
            });

            req.write(buffer);
            req.end();

        });
    });
}
sendUser();