const http = require("http");
const { serialize, deserialize } = require("../serializers/protobuf");
const readline = require("readline");

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


            console.log("\nBuffer:");
            console.log(buffer);


            console.log("\nBuffer length:");
            console.log(buffer.length);


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

                        console.log(responseBuffer);


                        // --------------------------------
                        // Deserialize response
                        // --------------------------------

                        const decoded =
                            deserialize(responseBuffer);


                        console.log(
                            "\nDecoded response:"
                        );
                        
                        console.log(decoded);
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
            req.write(buffer);

            req.end();
        });
    });
}
sendUser();