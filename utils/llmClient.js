// utils/llmClient.js
async function askLocalLLM(prompt) {
    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "qwen2.5-coder:3b",
            prompt: prompt,
            stream: false
        })
    });
    if (!response.ok) {
        throw new Error(`LLM request failed: ${response.status}`);
    }
    const data = await response.json();
    return data.response;
}

module.exports = { askLocalLLM };