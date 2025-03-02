// function sendMessage() {
//     const input = document.getElementById('chat-input');
//     const messages = document.getElementById('chat-messages');
//     const message = input.value.trim();
//     if (message) {
//         const messageElement = document.createElement('div');
//         messageElement.textContent = message;
//         messages.appendChild(messageElement);
//         input.value = '';
//         messages.scrollTop = messages.scrollHeight;
//     }
// }

async function sendMessage() {
    const inputField = document.getElementById("chat-input");
    const message = inputField.value.trim();

    if (!message) return; // Don't send empty messages

    // Display the user's message in the chat box
    displayMessage(message, "user");

    try {
        // Send message to backend
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();

        // Display the AI response in the chat box
        displayMessage(data.reply, "ai");
    } catch (error) {
        console.error("Error:", error);
        displayMessage("Error connecting to AI.", "error");
    }

    // Clear input field
    inputField.value = "";
}

// Function to display messages in the chat
function displayMessage(text, sender) {
    const chatMessages = document.getElementById("chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

