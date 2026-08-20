// utils/logger.js
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "..", "storage", "requests.log");

function logRequest(entry) {
    const line = JSON.stringify({
        timestamp: new Date().toISOString(),
        ...entry
    }) + "\n";
    fs.appendFileSync(LOG_FILE, line);
}

module.exports = { logRequest, LOG_FILE };