const test = require("node:test");
const assert = require("node:assert");
const http = require("http");

const server = require("../server");

const PORT = 4001;


// --------------------------------
// Start test server
// --------------------------------

test.before(() => {

    server.listen(PORT);

});


// --------------------------------
// Stop test server
// --------------------------------

test.after(() => {

    server.close();

});


// --------------------------------
// Helper: HTTP POST request
// --------------------------------

function postUser(user) {

    return new Promise((resolve, reject) => {

        const body = JSON.stringify(user);

        const req = http.request(
            {
                hostname: "localhost",
                port: PORT,
                path: "/user",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(body)
                }
            },
            (res) => {

                const chunks = [];

                res.on("data", (chunk) => {
                    chunks.push(chunk);
                });

                res.on("end", () => {

                    resolve({
                        statusCode: res.statusCode,
                        body: Buffer.concat(chunks).toString()
                    });

                });

            }
        );

        req.on("error", reject);

        req.write(body);
        req.end();

    });

}


// --------------------------------
// Valid User
// --------------------------------

test("POST /user should create a valid user", async () => {

    const response = await postUser({
        name: "Dharan",
        age: 21
    });

    assert.strictEqual(response.statusCode, 201);

    assert.deepStrictEqual(
        JSON.parse(response.body),
        {
            name: "Dharan",
            age: 21
        }
    );

});


// --------------------------------
// Invalid User
// --------------------------------

test("POST /user should reject invalid user", async () => {

    const response = await postUser({
        name: "",
        age: 21
    });

    assert.strictEqual(response.statusCode, 400);

    assert.deepStrictEqual(
        JSON.parse(response.body),
        {
            success: false,
            message: "Name cannot be empty"
        }
    );

});