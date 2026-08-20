const getRequestBody = require("../utils/bodyParser");

const { getSerializer } = require("../serializers");

const { saveUser } = require("../services/userService");

const { compress, decompress } = require("../utils/compression");

const { logRequest } = require("../utils/logger");


async function handleUserRoute(req, res) {

    try {

        // --------------------------------
        // 1. Read Content-Type
        // --------------------------------

        const contentType = req.headers["content-type"];
        const contentEncoding = req.headers["content-encoding"];

        console.log("\nContent-Type:", contentType);


        // --------------------------------
        // 2. Find serializer
        // --------------------------------

        const serializer = getSerializer(contentType);

        console.log("\nSelected serializer:");
        console.log(serializer);


        // --------------------------------
        // 3. Read request body
        // --------------------------------

        const buffer = await getRequestBody(req);

        console.log("Received Buffer:", buffer);

        let dataBuffer = buffer;

        if (contentEncoding === "gzip") {

            dataBuffer = decompress(buffer);

            console.log("Decompressed Buffer:");
            console.log(dataBuffer);

        }


        // --------------------------------
        // 4. Deserialize
        // --------------------------------

        const user = serializer.deserialize(dataBuffer);

        console.log("Deserialized User:", user);


        // --------------------------------
        // 5. Business logic
        // --------------------------------

        saveUser(user);


        // --------------------------------
        // 6. Serialize response
        // --------------------------------

        const serialized = serializer.serialize(user);

        const compressedResponse = compress(serialized);


        console.log("Serialized Response:", serialized);


        // --------------------------------
        // 7. Send response
        // --------------------------------

        res.statusCode = 201;

        res.setHeader(
            "Content-Type",
            contentType
        );

        res.setHeader(
            "Content-Encoding",
            "gzip"
        );

        res.setHeader(
            "Content-Length",
            compressedResponse.length
        );

        res.end(compressedResponse);

        logRequest({
            method: req.method,
            url: req.url,
            contentType,
            status: res.statusCode
        });

    }

    catch (err) {

        console.log(err);

        res.statusCode = 400;

        res.setHeader(
            "Content-Type",
            "application/json"
        );

        res.end(
            JSON.stringify({
                success: false,
                message: err.message
            })
        );

        logRequest({
            method: req.method,
            url: req.url,
            contentType: req.headers["content-type"],
            status: res.statusCode,
            error: err.message
        });

    }

}


module.exports = handleUserRoute;