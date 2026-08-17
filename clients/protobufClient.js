const http = require("http");
const protobuf = require("protobufjs");


async function sendUser() {

    const root =
        await protobuf.load("./schema/user.proto");


    const User =
        root.lookupType("User");


    const user = {
        name: "Dharan",
        age: 21
    };


    // Create Protobuf message
    const message =
        User.create(user);


    // Encode to binary
    const buffer =
        User.encode(message).finish();


    console.log("Sending buffer:");
    console.log(buffer);


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


                const decoded =
                    User.decode(
                        responseBuffer
                    );


                console.log(
                    "\nDecoded response:"
                );

                console.log(
                    User.toObject(decoded)
                );

            });

        });


    req.on("error", (error) => {

        console.log(error);

    });


    req.write(buffer);

    req.end();

}


sendUser();