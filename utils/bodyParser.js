// utils/bodyParser.js

function getRequestBody(req) {

    return new Promise((resolve, reject) => {

        const chunks = [];

        req.on("data", chunk => {
            console.log("Chunk:", chunk);
            chunks.push(chunk);
        });

        req.on("end", () => {
            resolve(Buffer.concat(chunks));
        });

        req.on("error", reject);

    });

}

module.exports = getRequestBody;