const getRequestBody = require("../utils/bodyParser");

const { serialize, deserialize } = require("../serializers/custom");

const { saveUser } = require("../services/userService");

async function handleUserRoute(req, res) {

    try {

        const buffer = await getRequestBody(req);

        console.log("\nBuffer:", buffer);

        const text = buffer.toString();

        console.log("\nText:", text);

        const user = deserialize(text);

        console.log("\nObject:", user);

        saveUser(user);

        const serialized = serialize(user);

        console.log("\nSerialized:", serialized);

        res.statusCode = 201;

        res.setHeader("Content-Type", "application/json");

        res.end(

            JSON.stringify({

                success: true,

                serialized,

                user

            })

        );

    }

    catch (err) {

        res.statusCode = 400;

        res.setHeader("Content-Type", "application/json");

        res.end(

            JSON.stringify({

                success: false,

                message: err.message

            })

        );

    }

}

module.exports = handleUserRoute;