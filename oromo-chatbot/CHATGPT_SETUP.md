# 🚀 Enable ChatGPT Mode - Setup Guide

Your Oromo chatbot is ready! It currently works in **Local Mode** with basic responses. To unlock **ChatGPT-level knowledge**, add your OpenAI API key.

## Option 1: Quick Setup (Recommended)

### Step 1: Get Your OpenAI API Key
1. Go to: https://platform.openai.com/api-keys
2. Log in or create a free account
3. Click "Create new secret key"
4. Copy the key (you won't see it again!)

### Step 2: Add Your API Key

**Windows (PowerShell):**
```powershell
# In your project folder, create a .env file with:
$env:OPENAI_API_KEY = "sk-..."
# Or edit the .env file manually (see below)
```

**Mac/Linux (Terminal):**
```bash
export OPENAI_API_KEY="sk-..."
```

### Step 3: Create `.env` File
Create a file named `.env` in your project root folder with:
```
OPENAI_API_KEY=sk-your-api-key-here
```

### Step 4: Restart the Bot
1. Stop the bot (Ctrl+C in terminal)
2. Run `python run.py` again
3. You should see: **🚀 ChatGPT Mode Enabled!**

---

## What You Get with ChatGPT Mode

✨ **Full AI Knowledge** - Answers to any question in Oromo
💡 **Context Aware** - Remembers your conversation history
📚 **Expert Explanations** - Science, history, technology, culture
🌍 **Translation Help** - Learn Oromo language
💬 **Natural Conversations** - Chat like you would with ChatGPT

---

## Free vs Paid OpenAI API

### Free Trial
- OpenAI gives new accounts **$5 free credit**
- Valid for 3 months
- Perfect for testing!
- Get it at: https://platform.openai.com

### Pricing (After free trial)
- **$0.0005 per 1K tokens** (input)
- **$0.0015 per 1K tokens** (output)
- Average conversation: **$0.01-0.10**
- Very affordable!

---

## Troubleshooting

### "API Key not found"
- Make sure `.env` file is in your project root
- Check the file name: must be exactly `.env`
- Restart the application

### "Invalid API Key"
- Copy the full key including "sk-" prefix
- No spaces before or after
- Check you copied the entire key

### "Rate limit exceeded"
- You've exceeded free trial quota
- Upgrade to paid or wait for reset
- Set billing limit in OpenAI dashboard

---

## File Structure After Setup
```
oromo-chatbot/
├── .env                 ← Add your API key here
├── .env.example         ← Template file
├── run.py
├── requirements.txt
└── ... (other files)
```

---

## Now Your Bot Has:

🧠 **GPT-3.5 Turbo Intelligence**
- Real-time knowledge
- Problem-solving
- Creative thinking
- Language understanding

🇪🇹 **Oromo Language Excellence**
- Responds ONLY in Oromo
- English translations included
- Teaches Oromo naturally
- Culturally aware

---

**Ready?** Add your API key and restart the bot! 🚀

Questions? Check the [OpenAI documentation](https://platform.openai.com/docs/guides/gpt)
