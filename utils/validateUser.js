function validateUser(user) {
    if (!user) {
        throw new Error("User data is required");
    }

    if (typeof user.name !== "string") {
        throw new Error("Name must be a string");
    }

    if (user.name.trim() === "") {
        throw new Error("Name cannot be empty");
    }

    if (user.age === undefined || user.age === null) {
        throw new Error("Age is required");
    }

    if (typeof user.age !== "number") {
        throw new Error("Age must be a number");
    }

    if (!Number.isInteger(user.age)) {
        throw new Error("Age must be an integer");
    }

    if (user.age < 0) {
        throw new Error("Age cannot be negative");
    }

    return true;
}

module.exports = validateUser;