// Oromo Chatbot - Frontend Script

const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messages');

// Check API status on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAPIStatus();
});

// Send message on button click
sendBtn.addEventListener('click', sendMessage);

// Send message on Enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function checkAPIStatus() {
    fetch('/status')
        .then(response => response.json())
        .then(data => {
            const indicator = document.getElementById('statusIndicator');
            if (data.api_configured) {
                indicator.innerHTML = '🚀 <strong>ChatGPT Mode Enabled!</strong> (Powered by OpenAI)';
                indicator.style.color = '#059669';
            } else {
                indicator.innerHTML = '📚 Local Mode (Basic responses - Add API key for ChatGPT mode)';
                indicator.style.color = '#f59e0b';
            }
        })
        .catch(error => {
            console.error('Status check error:', error);
        });
}

function sendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Add user message to UI
    addMessageToUI(message, 'user');
    userInput.value = '';
    
    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<strong>🤖 Oromo Bot:</strong><p>Waan barbaachisu jira...</p>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Send to server
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        // Remove typing indicator
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
        
        addMessageToUI(data.message, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
        // Remove typing indicator
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
        
        addMessageToUI('Dogoggora uumame. Yeroo maraa yali! (An error occurred. Try again!)', 'bot');
    });
}

function sendSampleMessage(message) {
    userInput.value = message;
    sendMessage();
}

function addMessageToUI(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <strong>Ati (You):</strong>
            <p>${escapeHtml(text)}</p>
        `;
    } else {
        messageDiv.innerHTML = `
            <strong>🤖 Oromo Bot:</strong>
            <p>${escapeHtml(text)}</p>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function clearHistory() {
    if (confirm('Seensa hafu giddu? (Clear history?)')) {
        fetch('/clear', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            messagesContainer.innerHTML = `
                <div class="message bot-message">
                    <strong>Oromo Bot:</strong>
                    <p>Salaam! Akkam jirtuu? Gaaffii kee irra eenyummaa dubbisu mitii?</p>
                    <small>Hello! How are you? What would you like to talk about?</small>
                </div>
            `;
        });
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
