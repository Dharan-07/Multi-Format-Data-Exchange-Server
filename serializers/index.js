const jsonSerializer = require("./json");
const customSerializer = require("./custom");
const protobufSerializer = require("./protobuf");
const avroSerializer = require("./avro");
const appError = require("../utils/appError")


const serializers = {

    "application/json": jsonSerializer,

    "text/plain": customSerializer,

    "application/x-protobuf": protobufSerializer,

    "application/avro": avroSerializer

};


function getSerializer(contentType) {

    const serializer = serializers[contentType];

    if (!serializer) {

        throw new appError(
            `Unsupported Content-Type: ${contentType}`,
            415
        );

    }

    return serializer;
}


module.exports = {
    getSerializer
};