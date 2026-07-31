const http = require('http')
const fs = require('fs')

const port = 4000;

const users = [];


const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "application/json");


    if (req.method == "POST" && req.url == "/user") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
            console.log(chunk)
        })

        req.on("end", () => {
            try {

                const database = fs.readFileSync("./storage/db.json","utf-8");
                console.log(body)
                const user = JSON.parse(body);

                users.push(user);
                console.log(users);

                res.statusCode = 200;

                res.end(
                    JSON.stringify({
                        success: true,
                        message: "User received"
                    })
                );
            }
            catch (err) {
                console.log(err);

                res.statusCode = 400;
                res.end(
                    JSON.stringify({
                        success: false,
                        message: "Invalid JSON"
                    })
                );
            }
        })
    }
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});