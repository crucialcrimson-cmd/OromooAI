from flask import Blueprint, render_template, request, jsonify
from app.oromo_responses import get_oromo_response
from app.gpt_integration import get_gpt_response, is_api_key_configured
import os

main_bp = Blueprint('main', __name__)

# Store conversation history
conversation_history = []

@main_bp.route('/')
def index():
    """Render the main chatbot page"""
    return render_template('index.html')

@main_bp.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages"""
    data = request.get_json()
    user_message = data.get('message', '').strip()
    
    if not user_message:
        return jsonify({'error': 'Empty message'}), 400
    
    # Use the intelligent GPT response (which has fallbacks built in)
    try:
        bot_response = get_gpt_response(user_message, conversation_history)
        if not bot_response:
            bot_response = "Wantoota kee hubannee hin dandeenya. Yaali irra deebi'i. (I didn't understand. Please try again.)"
    except Exception as e:
        print(f"❌ Chat Error: {str(e)}")
        bot_response = "Giddo dhabuu arge. Yaali irra deebi'i. (An error occurred. Please try again.)"
    
    print(f"📝 User: {user_message}")
    print(f"📝 Bot: {bot_response[:100]}")
    
    # Store in conversation history
    conversation_history.append({
        'user': user_message,
        'bot': bot_response
    })
    
    return jsonify({
        'response': bot_response,
        'history_length': len(conversation_history)
    })

@main_bp.route('/history', methods=['GET'])
def get_history():
    """Get conversation history"""
    return jsonify({'history': conversation_history})

@main_bp.route('/clear', methods=['POST'])
def clear_history():
    """Clear conversation history"""
    global conversation_history
    conversation_history = []
    return jsonify({'status': 'cleared'})
