// script.js
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

let clientIndex = 1;

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value;
    if (messageText) {
        const messageElement = document.createElement('div');
        messageElement.className = `message client-${clientIndex}`;
        messageElement.textContent = messageText;

        messagesContainer.appendChild(messageElement);
        messageInput.value = '';

        clientIndex = clientIndex < 3 ? clientIndex + 1 : 1;
    }
});
