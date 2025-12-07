# Quick Start Guide - Oromo Chatbot Setup

## ⚠️ Python Installation Required

Before you can run the chatbot, you need to install Python on your computer.

### Step 1: Install Python

1. Download Python from: https://www.python.org/downloads/
2. Run the installer
3. **IMPORTANT:** During installation, check the box "Add Python to PATH"
4. Complete the installation

After installation, restart your terminal to apply changes.

### Step 2: Verify Python Installation

Open PowerShell and run:
```powershell
python --version
```

You should see something like `Python 3.11.0` or higher.

### Step 3: Install Dependencies

In the project folder (oromo-chatbot), run:
```powershell
pip install -r requirements.txt
```

This will install:
- Flask (web framework)
- python-dotenv (for environment variables)
- requests (HTTP library)

### Step 4: Run the Chatbot

```powershell
python run.py
```

You should see:
```
==================================================
🇪🇹 Oromo AI Chatbot
Afaan Oromoo - Oromo Language Chat
==================================================

✅ Starting chatbot server...
📍 Open your browser at: http://localhost:5000

🇪🇹 Salaam! Guyyaa on jira! (Welcome!)

==================================================
```

### Step 5: Open in Browser

Open your web browser and go to: **http://localhost:5000**

---

## Troubleshooting

### Issue: "Python was not found"
- **Solution:** Make sure Python is added to PATH during installation
- Restart your computer after installing Python

### Issue: "pip: The term 'pip' is not recognized"
- **Solution:** This usually means Python wasn't added to PATH
- Reinstall Python and check the "Add Python to PATH" option

### Issue: Port 5000 is already in use
- **Solution:** Edit `run.py` and change the port number:
  ```python
  app.run(debug=True, host='localhost', port=5001)
  ```

---

## Features of the Chatbot

✨ **100% Oromo** - All responses are in Oromo with English translations
🤖 **Intelligent** - Recognizes keywords and responds appropriately
💬 **Real-time** - Instant responses to your messages
📱 **Responsive** - Works on phones, tablets, and desktops
🎨 **Beautiful UI** - Modern and user-friendly interface

---

## Sample Oromo Phrases

Try these in the chatbot:
- **Salaam** - Hello
- **Akkam jirtuu?** - How are you?
- **Maqaa kee maal?** - What is your name?
- **Afaan Oromoo** - Oromo language
- **Biʼaa** - Goodbye

---

**Need help?** Check the README.md file in the project folder for more information!

🇪🇹 Guyyaa Qabuu! (Enjoy!)
