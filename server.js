const http = require("http");

const handleUserRoute = require("./routes/userRoute");

const port = 4000;

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {

        res.statusCode = 200;

        res.end("API Running");

        return;

    }

    if (req.method === "POST" && req.url === "/user") {

        return handleUserRoute(req, res);

    }

    res.statusCode = 404;

    res.end("Route Not Found");

});

server.listen(port, () => {

    console.log(`Server running on http://localhost:${port}`);

});