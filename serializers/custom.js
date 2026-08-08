function serialize(user) {

    return `${user.name}|${user.age}`;

}


function deserialize(buffer) {

    const data = buffer.toString();

    const [name, age] = data.split("|");

    if (!name || !age) {
        throw new Error("Invalid custom format");
    }

    return {
        name,
        age: Number(age)
    };

}


module.exports = {
    serialize,
    deserialize
};