// routes/analyzeLogsRoute.js
const fs = require("fs");
const { LOG_FILE } = require("../utils/logger");
const { askLocalLLM } = require("../utils/llmClient");

async function handleAnalyzeLogs(req, res) {
    let logs;
    try {
        logs = fs.readFileSync(LOG_FILE, "utf-8");
    } catch (err) {
        res.statusCode = 404;
        res.end(JSON.stringify({ success: false, message: "No log file found yet" }));
        return;
    }

    const lines = logs.trim().split("\n").filter(Boolean);
    const recentLines = lines.slice(-100); // widen the window for a detailed report

    // Pre-compute basic stats in code (cheap, reliable, doesn't depend on the LLM)
    const parsed = recentLines.map(line => {
        try { return JSON.parse(line); } catch { return null; }
    }).filter(Boolean);

    const totalRequests = parsed.length;
    const errorEntries = parsed.filter(e => e.status >= 400);
    const statusCounts = parsed.reduce((acc, e) => {
        acc[e.status] = (acc[e.status] || 0) + 1;
        return acc;
    }, {});

    const prompt = `You are a backend engineer writing a detailed error report from server request logs.
Each line is a JSON log entry with fields like timestamp, method, url, contentType, status, and optionally error.

Write a DETAILED report with these exact sections:

## Summary
Total requests analyzed, number of errors, error rate as a percentage.

## Errors Found
For EACH distinct error, list:
- Timestamp
- Endpoint/URL
- Status code
- Error message
- Likely root cause (your best technical guess based on the message)

## Patterns
Any repeated errors, spikes, or correlations (e.g. "all errors happened on /user with content-type X").

## Recommendations
Concrete, specific fixes for each distinct error type found. If no errors, say so explicitly and skip this section.

Be specific and technical — this is for a developer debugging their own server, not a general audience.

Pre-computed stats (for reference, verify against raw logs):
Total requests: ${totalRequests}
Status code breakdown: ${JSON.stringify(statusCounts)}
Error count: ${errorEntries.length}

Raw logs:
${recentLines.join("\n")}`;

    try {
        const report = await askLocalLLM(prompt);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            success: true,
            stats: {
                totalRequests,
                errorCount: errorEntries.length,
                statusCounts
            },
            report
        }));
    } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ success: false, message: "LLM analysis failed", error: err.message }));
    }
}

module.exports = handleAnalyzeLogs;