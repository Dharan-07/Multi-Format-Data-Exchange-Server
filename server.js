const http = require('http')
const fs = require('fs')
const { serialize, deserialize } = require("./serializers/custom");
const port = 4000;

//const users = [];


const server = http.createServer((req, res) => {

    //res.setHeader("Content-Type", "text/plain");

    if (req.method == "GET" && req.url == "/") {
        try {
            res.statusCode = 200;
            res.end("API's home page")
        } catch (err) {
            console.log(err);
        }
    }

    if (req.method == "POST" && req.url == "/user") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
            console.log("\nchunck data : ",chunk)
            console.log("\nwhole data : ",body)
        })

        req.on("end", () => {
            try {
                const user = deserialize(body);
                console.log("\nAfter deserialize : ",user)

                const database = fs.readFileSync("./storage/db.json", "utf8");

                const users = JSON.parse(database);

                users.push(user);

                fs.writeFileSync(
                    "./storage/db.json",
                    
                    JSON.stringify(users, null, 2)
                );
                console.log("\n",users);

                const data = serialize(user)
                console.log("\nAfter serialize : ",data);

                //res.setHeader("Content-Type", "text/plain");

                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");

                res.end(
                    JSON.stringify({
                        serialized: data,
                        deserialized: user
                    })
                );
            }
            catch (err) {
                res.statusCode = 400;

                res.end(
                    JSON.stringify({
                        success: false,
                        message: err.message
                    })
                );
            }
        })
    }

    if (req.method === "POST" && req.url === "/custom-user") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {

                const user = deserialize(body);

                console.log(user);

                res.statusCode = 201;

                res.end(
                    JSON.stringify({
                        success: true,
                        user
                    })
                );

            } catch (err) {

                res.statusCode = 400;

                res.end(
                    JSON.stringify({
                        success: false,
                        message: err.message
                    })
                );

            }

        });

    }
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});