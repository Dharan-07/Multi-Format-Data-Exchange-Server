function serialize(user) {

    return JSON.stringify(user);

}


function deserialize(buffer) {

    const data = buffer.toString();

    return JSON.parse(data);

}


module.exports = {
    serialize,
    deserialize
};