const fs = require("fs");

const DB_PATH = "./storage/db.json";


function getUsers() {

    const database = fs.readFileSync(
        DB_PATH,
        "utf8"
    );

    return JSON.parse(database);

}


function saveUser(user) {

    const users = getUsers();

    users.push(user);

    fs.writeFileSync(
        DB_PATH,
        JSON.stringify(users, null, 2)
    );

    return user;

}


module.exports = {
    getUsers,
    saveUser
};