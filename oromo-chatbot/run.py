#!/usr/bin/env python3
"""
Oromo Chatbot - Run the Flask application
"""

from app import create_app

if __name__ == '__main__':
    app = create_app()
    print("\n" + "="*50)
    print("🇪🇹 Oromo AI Chatbot")
    print("Afaan Oromoo - Oromo Language Chat")
    print("="*50)
    print("\n✅ Starting chatbot server...")
    print("📍 Open your browser at: http://localhost:5000")
    print("\n🇪🇹 Salaam! Guyyaa on jira! (Welcome!)\n")
    print("="*50 + "\n")
    
    app.run(debug=True, host='localhost', port=5000)
