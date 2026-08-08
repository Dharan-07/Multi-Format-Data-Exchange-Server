function serialize(user) {
    return Buffer.from(`${user.name}|${user.age}`);
}

function deserialize(buffer) {

    const data = buffer.toString();

    const [name, age] = data.split("|");

    return {
        name,
        age: Number(age)
    };
}

module.exports = {
    serialize,
    deserialize
};