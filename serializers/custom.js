function serialize(user) {
    return `${user.name}|${user.age}`;
}

function deserialize(data) {

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