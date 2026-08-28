const test = require("node:test");
const assert = require("node:assert");

const validateUser = require("../utils/validateUser");


// --------------------------------
// Valid User
// --------------------------------

test("valid user should pass validation", () => {

    const user = {
        name: "Dharan",
        age: 21
    };

    assert.doesNotThrow(() => {
        validateUser(user);
    });

});


// --------------------------------
// Invalid Name
// --------------------------------

test("name must be a string", () => {

    const user = {
        name: 123,
        age: 21
    };

    assert.throws(
        () => validateUser(user),
        {
            message: "Name must be a string"
        }
    );

});


test("name cannot be empty", () => {

    const user = {
        name: "",
        age: 21
    };

    assert.throws(
        () => validateUser(user),
        {
            message: "Name cannot be empty"
        }
    );

});


test("name is required", () => {

    const user = {
        age: 21
    };

    assert.throws(
        () => validateUser(user),
        {
            message: "Name must be a string"
        }
    );

});


// --------------------------------
// Invalid Age
// --------------------------------

test("age is required", () => {

    const user = {
        name: "Dharan"
    };

    assert.throws(
        () => validateUser(user),
        {
            message: "Age is required"
        }
    );

});


test("age must be a number", () => {

    const user = {
        name: "Dharan",
        age: "21"
    };

    assert.throws(
        () => validateUser(user),
        {
            message: "Age must be a number"
        }
    );

});


test("age must be an integer", () => {

    const user = {
        name: "Dharan",
        age: 21.5
    };

    assert.throws(
        () => validateUser(user),
        {
            message: "Age must be an integer"
        }
    );

});


test("age cannot be negative", () => {

    const user = {
        name: "Dharan",
        age: -5
    };

    assert.throws(
        () => validateUser(user),
        {
            message: "Age cannot be negative"
        }
    );

});