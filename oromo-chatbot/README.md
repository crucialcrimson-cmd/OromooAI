# 🇪🇹 Oromo AI Chatbot

A chat AI bot that responds exclusively in **Oromo** (Afaan Oromoo), one of the most widely spoken languages in Africa. Built with Flask and powered by OpenAI's GPT technology, designed with a modern, user-friendly interface.

## 🌟 Features

✨ **Oromo Language Only** - All responses are in Oromo with English translations
🚀 **ChatGPT-Powered** - Optional OpenAI integration for advanced AI knowledge
🤖 **AI Chatbot** - Intelligent response system with conversation memory
💬 **Real-time Chat** - Instant message responses
📱 **Responsive Design** - Works on desktop, tablet, and mobile
🎨 **Modern UI** - Beautiful, intuitive interface with typing indicators
📚 **Sample Questions** - Pre-built Oromo phrases to get started
🔄 **Conversation History** - Maintains context across messages

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher (already installed!)
- OpenAI API key (optional - for ChatGPT mode)

### Installation

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **(Optional) Add OpenAI API Key:**
   - Create a `.env` file in the project root
   - Add: `OPENAI_API_KEY=sk-your-api-key-here`
   - Get a free API key at: https://platform.openai.com/api-keys

3. **Run the application:**
   ```bash
   python run.py
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5000`

## 📖 Usage

### Starting a Conversation

1. Type your message in Oromo or English in the input field
2. Click the "🚀 Ergi" (Send) button or press Enter
3. The bot will respond in Oromo with English translations

### Sample Questions (Gaaffii Baraa)

- **Salaam** - Hello
- **Akkam jirtuu?** - How are you?
- **Maqaa kee maal?** - What is your name?
- **Afaan Oromoo** - Oromo language

## 🔧 Two Operating Modes

### Mode 1: Local Mode (Default)
- Works without API key
- Uses pre-configured Oromo responses
- Basic but instant responses
- Perfect for getting started

### Mode 2: ChatGPT Mode (Advanced)
- Powered by OpenAI's GPT-3.5
- Unlimited knowledge and topics
- Conversation context awareness
- Natural, flowing conversations
- Requires OpenAI API key

**See [CHATGPT_SETUP.md](CHATGPT_SETUP.md) for easy setup instructions!**

## 📁 Project Structure

```
oromo-chatbot/
├── app/
│   ├── __init__.py              # Flask app initialization
│   ├── routes.py                # API routes and endpoints
│   ├── config.py                # Configuration and prompts
│   ├── oromo_responses.py       # Local response database
│   └── gpt_integration.py       # OpenAI API integration
├── templates/
│   └── index.html               # Main chatbot interface
├── static/
│   ├── style.css                # Styling and animations
│   └── script.js                # Frontend JavaScript
├── run.py                       # Application entry point
├── requirements.txt             # Python dependencies
├── .env.example                 # Environment variables template
├── README.md                    # This file
├── CHATGPT_SETUP.md            # ChatGPT mode setup guide
└── SETUP.md                     # Basic setup guide
```

## 🛠️ Technology Stack

- **Backend:** Flask (Python web framework)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **AI:** OpenAI GPT-3.5 Turbo (optional)
- **Language:** Oromo (Afaan Oromoo)

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main chatbot page |
| `/chat` | POST | Send message and get response |
| `/history` | GET | Get conversation history |
| `/clear` | POST | Clear conversation history |
| `/status` | GET | Check if ChatGPT mode is enabled |

## 🌐 Oromo Language Support

The chatbot includes comprehensive Oromo language support with:
- Greetings in Oromo (Salaam, Gidiraa gaarii)
- Common phrases and responses
- English translations for reference
- Natural conversation patterns
- Full ChatGPT knowledge in Oromo (with API key)

## 🎨 Customization

### Adding New Oromo Responses (Local Mode)

Edit `app/oromo_responses.py`:

```python
OROMO_RESPONSES = {
    "your_keyword": "Your oromo response here (ኢንግሊዝ: English translation)",
}
```

### Changing UI Colors

Modify CSS variables in `static/style.css`:

```css
:root {
    --primary-color: #1e40af;
    --secondary-color: #dc2626;
    --accent-color: #f59e0b;
}
```

### Customizing GPT Behavior

Edit `app/config.py` - modify `OROMO_SYSTEM_PROMPT` to change how GPT responds

## 🔐 Security Notes

- **API Keys:** Never commit `.env` files to git
- **Rate Limiting:** OpenAI API has usage limits
- **Cost:** Monitor your usage on the OpenAI dashboard
- **Privacy:** Conversations are stored locally in memory

## 🐛 Troubleshooting

### Port Already in Use
Edit `run.py`:
```python
app.run(debug=True, host='localhost', port=5001)
```

### Dependency Issues
Reinstall dependencies:
```bash
pip install --upgrade -r requirements.txt
```

### ChatGPT Mode Not Working
1. Verify `.env` file exists in project root
2. Check API key is correct at: https://platform.openai.com/api-keys
3. Ensure sufficient API credits

### Responses are Generic
- You're in Local Mode (no API key set)
- Follow [CHATGPT_SETUP.md](CHATGPT_SETUP.md) to enable ChatGPT mode

## 🚀 Future Enhancements

🌐 Support for additional East African languages
💾 Persistent conversation history with database
🔐 User authentication and profiles
📊 Usage analytics and statistics
🎯 Fine-tuned models for specific domains
🗣️ Voice input/output support

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📜 License

Open source project - Feel free to use and modify.

---

## 🇪🇹 Guyyaa Qabuu! (Enjoy!)

**Afaan Oromoo Guyyaa!**

### Learn More
- [Oromo Language on Wikipedia](https://en.wikipedia.org/wiki/Oromo_language)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Flask Documentation](https://flask.palletsprojects.com)

### Support
For setup help: See [CHATGPT_SETUP.md](CHATGPT_SETUP.md)
For basic issues: See [SETUP.md](SETUP.md)
