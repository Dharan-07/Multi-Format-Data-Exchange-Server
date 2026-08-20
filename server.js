const http = require("http");

const handleUserRoute = require("./routes/userRoute");
const handleAnalyzeLogs = require("./routes/analyzeLogsRoute");

const port = 4000;


const server = http.createServer((req, res) => {

    // Home route
    if (
        req.method === "GET" &&
        req.url === "/"
    ) {

        res.statusCode = 200;

        res.setHeader(
            "Content-Type",
            "text/plain"
        );

        res.end("API Running");

        return;
    }


    // User route
    if (
        req.method === "POST" &&
        req.url === "/user"
    ) {

        return handleUserRoute(req, res);

    }


    // Analyze logs route
    if (
        req.method === "POST" &&
        req.url === "/analyze-logs"
    ) {

        return handleAnalyzeLogs(req, res);

    }


    // Route not found
    res.statusCode = 404;

    res.setHeader(
        "Content-Type",
        "application/json"
    );

    res.end(
        JSON.stringify({
            success: false,
            message: "Route Not Found"
        })
    );

});


server.listen(port, () => {

    console.log(
        `Server running on http://localhost:${port}`
    );

});