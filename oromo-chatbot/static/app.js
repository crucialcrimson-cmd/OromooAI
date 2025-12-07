// Global state
let currentUser = null;
let currentChatId = null;
let currentChatMessages = [];
let allChats = [];

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        goToChat();
    }

    // Restore theme
    const theme = localStorage.getItem('theme') || 'light';
    setTheme(theme);

    // Setup event listeners
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Close menus when clicking outside
    document.addEventListener('click', function(event) {
        const profileBtn = document.getElementById('profileBtn');
        const profileMenu = document.getElementById('profileMenu');
        
        if (profileMenu && profileBtn && !profileBtn.contains(event.target)) {
            profileMenu.style.display = 'none';
        }
    });
});

// ============= AUTHENTICATION =============

function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelector('input[type="password"]').value.trim();

    if (!email || !password) {
        alert('Email fi Password barbaada');
        return false;
    }

    // Store user
    currentUser = {
        id: Date.now().toString(),
        email: email,
        name: email.split('@')[0],
        joinDate: new Date().toLocaleDateString()
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    goToChat();
    return false;
}

function handleSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const inputs = form.querySelectorAll('input');
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const password = inputs[2].value.trim();
    const confirmPassword = inputs[3].value.trim();

    if (!name || !email || !password || !confirmPassword) {
        alert('Dirirsi guutuu barbaada');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Password inuma hin takkalleen jiru');
        return false;
    }

    // Store user
    currentUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        joinDate: new Date().toLocaleDateString()
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    goToChat();
    return false;
}

function switchToSignup(event) {
    event.preventDefault();
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('signupPage').classList.add('active');
}

function switchToLogin(event) {
    event.preventDefault();
    document.getElementById('signupPage').classList.remove('active');
    document.getElementById('loginPage').classList.add('active');
}

// ============= NAVIGATION =============

function goToChat() {
    if (!currentUser) return;

    // Show chat page
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('signupPage').classList.remove('active');
    document.getElementById('chatPage').classList.add('active');

    // Update profile
    const profileBtn = document.getElementById('profileBtnName');
    if (profileBtn) profileBtn.textContent = currentUser.name || 'User';

    const userGreeting = document.getElementById('userGreeting');
    if (userGreeting) userGreeting.textContent = `Salaam, ${currentUser.name || 'User'}!`;

    // Initialize
    initializeChatHistory();
    startNewChat();

    // NOW attach event listeners after DOM elements are visible
    setTimeout(() => {
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }

        const userInput = document.getElementById('userInput');
        if (userInput) {
            userInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
    }, 100);
}

function logout() {
    if (confirm('Bahi barbaadda?')) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        currentChatId = null;
        currentChatMessages = [];

        document.getElementById('chatPage').classList.remove('active');
        document.getElementById('loginPage').classList.add('active');

        // Reset forms
        document.querySelectorAll('form').forEach(form => form.reset());
    }
}

// ============= CHAT =============

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (!message) return;

    addMessageToUI(message, 'user');

    if (!currentChatId) {
        currentChatId = Date.now().toString();
    }

    currentChatMessages.push({
        text: message,
        sender: 'user',
        timestamp: new Date().getTime()
    });

    userInput.value = '';

    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: message,
            chat_id: currentChatId
        })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.response || 'Gaaffii kee hubannee hin dandeenya.';
        addMessageToUI(botResponse, 'bot');
        currentChatMessages.push({
            text: botResponse,
            sender: 'bot',
            timestamp: new Date().getTime()
        });
        saveChatToHistory();
    })
    .catch(error => {
        console.error('Error:', error);
        addMessageToUI('Giddo dhabuu arge', 'bot');
    });
}

function addMessageToUI(message, sender) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    if (sender === 'bot') {
        messageDiv.innerHTML = `<strong>OromoAI:</strong><p>${message}</p>`;
    } else {
        messageDiv.innerHTML = `<strong>Ati:</strong><p>${message}</p>`;
    }

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ============= HISTORY =============

function initializeChatHistory() {
    const savedChats = localStorage.getItem('chatHistory');
    if (savedChats) {
        allChats = JSON.parse(savedChats);
        displayChatHistory();
    }
}

function saveChatToHistory() {
    if (!currentChatId || currentChatMessages.length === 0) return;

    const firstUserMsg = currentChatMessages.find(m => m.sender === 'user');
    let title = firstUserMsg ? firstUserMsg.text.substring(0, 30) : 'Seensa haaraa';
    if (firstUserMsg && firstUserMsg.text.length > 30) title += '...';

    let chatEntry = allChats.find(c => c.id === currentChatId);
    if (!chatEntry) {
        chatEntry = { id: currentChatId, title: title, createdAt: new Date().getTime(), messages: [] };
        allChats.unshift(chatEntry);
    } else {
        chatEntry.title = title;
    }

    chatEntry.messages = currentChatMessages;
    localStorage.setItem('chatHistory', JSON.stringify(allChats));
    displayChatHistory();
}

function displayChatHistory() {
    const historyList = document.getElementById('chatHistoryList');
    historyList.innerHTML = '';

    if (allChats.length === 0) {
        historyList.innerHTML = '<p class="empty-state">Seensa haaraa hin jiru</p>';
        return;
    }

    allChats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = 'history-item' + (chat.id === currentChatId ? ' active' : '');
        chatItem.textContent = chat.title;
        chatItem.onclick = () => loadChat(chat.id);
        historyList.appendChild(chatItem);
    });
}

function loadChat(chatId) {
    const chat = allChats.find(c => c.id === chatId);
    if (chat) {
        currentChatId = chat.id;
        currentChatMessages = chat.messages;
        
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = '';

        currentChatMessages.forEach(msg => {
            addMessageToUI(msg.text, msg.sender);
        });

        displayChatHistory();
    }
}

function startNewChat() {
    if (currentChatMessages.length > 0) {
        saveChatToHistory();
    }

    currentChatId = null;
    currentChatMessages = [];
    
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = `
        <div class="message bot-message">
            <strong>OromoAI:</strong>
            <p>Salaam! Akkam jirtuu? Gaaffii kee gaafadhu!</p>
            <small>Hello! How are you? Ask me a question!</small>
        </div>
    `;

    displayChatHistory();
}

// ============= THEME =============

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const lightBtn = document.getElementById('lightTheme');
    const darkBtn = document.getElementById('darkTheme');
    
    if (lightBtn) lightBtn.classList.toggle('active', theme === 'light');
    if (darkBtn) darkBtn.classList.toggle('active', theme === 'dark');
}

// ============= PROFILE & SETTINGS =============

function toggleProfileMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('profileMenu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function showProfileDetail(section) {
    const modal = document.getElementById('settingsModal');
    const profileDetail = document.getElementById('profileDetail');
    const settingsDetail = document.getElementById('settingsDetail');
    const personalisationDetail = document.getElementById('personalisationDetail');

    profileDetail.style.display = 'none';
    settingsDetail.style.display = 'none';
    personalisationDetail.style.display = 'none';

    if (section === 'profile') {
        profileDetail.style.display = 'block';
        document.getElementById('profileNameValue').textContent = currentUser.name || 'User';
        document.getElementById('profileEmailValue').textContent = currentUser.email || 'user@email.com';
        document.getElementById('profileJoinValue').textContent = currentUser.joinDate || 'Today';
    } else if (section === 'settings') {
        settingsDetail.style.display = 'block';
    } else if (section === 'personalisation') {
        personalisationDetail.style.display = 'block';
    }

    document.getElementById('profileMenu').style.display = 'none';
    modal.style.display = 'block';
}

function closeProfileDetail() {
    document.getElementById('settingsModal').style.display = 'none';
}
