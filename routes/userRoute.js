const getRequestBody = require("../utils/bodyParser");

const { getSerializer } = require("../serializers");

const { saveUser } = require("../services/userService");


async function handleUserRoute(req, res) {

    try {

        // --------------------------------
        // 1. Read Content-Type
        // --------------------------------

        const contentType = req.headers["content-type"];

        console.log("\nContent-Type:", contentType);


        // --------------------------------
        // 2. Find serializer
        // --------------------------------

        const serializer = getSerializer(contentType);


        // --------------------------------
        // 3. Read request body
        // --------------------------------

        const buffer = await getRequestBody(req);

        console.log("Received Buffer:", buffer);


        // --------------------------------
        // 4. Deserialize
        // --------------------------------

        const user = serializer.deserialize(buffer);

        console.log("Deserialized User:", user);


        // --------------------------------
        // 5. Business logic
        // --------------------------------

        saveUser(user);


        // --------------------------------
        // 6. Serialize response
        // --------------------------------

        const serialized = serializer.serialize(user);


        console.log("Serialized Response:", serialized);


        // --------------------------------
        // 7. Send response
        // --------------------------------

        res.statusCode = 201;

        res.setHeader(
            "Content-Type",
            contentType
        );


        if (contentType === "application/json") {

            res.end(serialized);

        }
        else {

            res.end(serialized);

        }

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

    }

}


module.exports = handleUserRoute;