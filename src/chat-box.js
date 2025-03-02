import { getGroqChatCompletion } from "../index.js";

let history = "";

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    const message = input.value.trim();
    console.log(history);
    if (message) {
        history += message + "\n";
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messages.appendChild(messageElement);
        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    }

    // Wait for the API to respond
    await receiveMessage();
}

async function receiveMessage() {
    const apiMessage = await getGroqChatCompletion(history);

    console.log(apiMessage.choices[0]?.message?.content || "Error: No response");

    const messages = document.getElementById('chat-messages');
    history += apiMessage.choices[0]?.message?.content + "\n";
    const messageElement = document.createElement('div');
    messageElement.textContent = apiMessage.choices[0]?.message?.content || "Error: No response";
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}

// Ensure sendMessage is available globally
window.sendMessage = sendMessage;