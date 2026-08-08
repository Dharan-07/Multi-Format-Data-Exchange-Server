function getRequestBody(req) {

    return new Promise((resolve, reject) => {

        const chunks = [];

        req.on("data", (chunk) => {

            chunks.push(chunk);

        });

        req.on("end", () => {

            const body = Buffer.concat(chunks);

            resolve(body);

        });

        req.on("error", (err) => {

            reject(err);

        });

    });

}


module.exports = getRequestBody;