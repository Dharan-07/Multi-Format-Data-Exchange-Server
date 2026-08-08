const jsonSerializer = require("./json");
const customSerializer = require("./custom");


const serializers = {

    "application/json": jsonSerializer,

    "text/plain": customSerializer

};


function getSerializer(contentType) {

    const serializer = serializers[contentType];

    if (!serializer) {

        throw new Error(
            `Unsupported Content-Type: ${contentType}`
        );

    }

    return serializer;

}


module.exports = {
    getSerializer
};