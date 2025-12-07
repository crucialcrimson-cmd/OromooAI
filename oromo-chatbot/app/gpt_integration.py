"""
AI Integration for Oromo Chatbot
Connects to multiple APIs: OpenAI, Hugging Face, or local responses
"""

import os
import requests
import json
from openai import OpenAI
from app.config import OPENAI_API_KEY, OROMO_SYSTEM_PROMPT

# Hugging Face models for free inference (no quota)
HF_MODELS = [
    "mistralai/Mistral-7B-Instruct-v0.1",  # Free, fast, good
    "meta-llama/Llama-2-7b-chat-hf",  # Good conversational
]

def is_api_key_configured():
    """Check if OpenAI API key is set"""
    return bool(OPENAI_API_KEY)

def get_huggingface_response(user_message, conversation_history=None):
    """Get response from Hugging Face free inference API using Together API (free tier)"""
    try:
        # Using Together AI free API endpoint (no cost, no quota)
        api_key = os.getenv("TOGETHER_API_KEY", "")
        
        if not api_key:
            # Fallback to HuggingFace free inference without authentication
            # This is slower but completely free
            model_id = HF_MODELS[0]
            hf_url = f"https://api-inference.huggingface.co/models/{model_id}"
            
            # Build conversation context
            context = "You are OromoAI, a helpful AI assistant.\n"
            if conversation_history:
                for entry in conversation_history[-3:]:
                    context += f"User: {entry['user']}\nAssistant: {entry['bot']}\n"
            
            prompt = f"{context}User: {user_message}\nAssistant:"
            
            payload = {
                "inputs": prompt,
                "parameters": {
                    "max_length": 500,
                    "temperature": 0.7,
                }
            }
            
            response = requests.post(hf_url, json=payload, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                if isinstance(result, list) and len(result) > 0:
                    generated = result[0].get("generated_text", "")
                    # Extract assistant response
                    if "Assistant:" in generated:
                        bot_response = generated.split("Assistant:")[-1].strip()
                    else:
                        bot_response = generated.strip()
                    return bot_response[:600]
            
            return None
        
    except Exception as e:
        print(f"❌ Hugging Face Error: {str(e)}")
        return None

def get_simple_conversational_response(user_message, conversation_history=None):
    """
    Fallback: Use a simple rule-based conversational system that can handle complex queries
    This works without any API keys!
    """
    user_lower = user_message.lower()
    
    # Knowledge base for common questions
    if any(word in user_lower for word in ["homework", "math", "calculate", "solve"]):
        return "Gaaffii math keessan geessee lubaa gargaaruu nan danda'a! Please share the specific problem. (I can help with math problems! Please share the specific problem.)"
    
    if any(word in user_lower for word in ["code", "python", "javascript", "program"]):
        return "Barreessuu qoodu nama jaalalta! Maal qoodu akka barreessu barbaadda? (I love coding! What code would you like to write?)"
    
    if any(word in user_lower for word in ["story", "story time", "tell me"]):
        return "Hiikaa tokko geesse! Kun akka seenaan tokko ta'ee jira: Korra tokko yeroo duraa ummata tokko jira ture... (I love stories! Here's one: Once upon a time in a land far away...)"
    
    if any(word in user_lower for word in ["weather", "rain", "sun", "hot", "cold"]):
        return "Yeroo suuqa amma hin beekuu, garuu ni danda'a ati beeksiisuudhaan faakkaasa! (I don't know the current weather, but you can tell me!)"
    
    if any(word in user_lower for word in ["help", "how do", "explain", "what is"]):
        return "Gaaffii keessan ibsu!" + user_message[-50:] + " Garuu ni danda'a ati irra dubbisuu! (I can help! What would you like to know?)"
    
    if any(word in user_lower for word in ["love", "like", "favorite"]):
        return "Koo ilaallee! Wantoota kana barbaadhu! (Me too! I love that!)"
    
    if any(word in user_lower for word in ["sorry", "apology"]):
        return "Maqaan koo miti! Garuu itti mari'annee jiruu dandeenya. (No worries! We can figure it out together.)"
    
    if any(word in user_lower for word in ["ok", "yes", "eeyyee", "correct", "right"]):
        return "Gaarii! Maal biroo gaaffii? (Great! What else would you like to know?)"
    
    if any(word in user_lower for word in ["no", "lakkaa", "wrong"]):
        return "Lakkaa. Walii galeef irra yaaluuf yaali. (Got it. Let me try again. What did I get wrong?)"
    
    if any(word in user_lower for word in ["joke", "funny", "laugh"]):
        return "Hiikaan tokko geesse: Maal kun akka seenaan ta'ee? Dubbiin! Dubbiin dhaloonni gidduu tokko ta'a! Hahaha! (Here's a joke: Why was the language so fun? Because it's beautiful!)"
    
    if any(word in user_lower for word in ["email", "contact", "phone"]):
        return "Email: support@oromoai.com | Telephone dhabuu! (Email: support@oromoai.com | Phone: Not available)"
    
    if any(word in user_lower for word in ["time", "what time"]):
        return "Yeroo amma hin beekuu, garuu ni danda'a ati beeksiisuudhaan faakkaasa! (I don't know the exact time, but you can tell me!)"
    
    # Default conversational response
    return "Wantoota kee gaafadhe akka hubannee yaali. " + user_message[:40] + "... Barbaaddu maal? (I tried to understand what you asked. What would you like to know about that?)"

def get_gpt_response(user_message, conversation_history=None):
    """
    Get response from GPT with Oromo language support
    Falls back to Hugging Face or simple responses if OpenAI API fails
    """
    if not is_api_key_configured():
        # Try Hugging Face
        hf_response = get_huggingface_response(user_message, conversation_history)
        if hf_response:
            return hf_response
        # Fallback to simple conversation
        return get_simple_conversational_response(user_message, conversation_history)
    
    try:
        client = OpenAI(api_key=OPENAI_API_KEY)
        
        # Prepare messages with conversation history
        messages = [
            {"role": "system", "content": OROMO_SYSTEM_PROMPT}
        ]
        
        # Add conversation history if available
        if conversation_history:
            for entry in conversation_history[-5:]:  # Last 5 messages for context
                messages.append({"role": "user", "content": entry['user']})
                messages.append({"role": "assistant", "content": entry['bot']})
        
        # Add current user message
        messages.append({"role": "user", "content": user_message})
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
            max_tokens=500,
            top_p=0.9
        )
        
        # Extract response text
        bot_response = response.choices[0].message.content.strip()
        return bot_response
        
    except Exception as e:
        print(f"❌ OpenAI API Error: {str(e)}")
        # Fallback to Hugging Face
        hf_response = get_huggingface_response(user_message, conversation_history)
        if hf_response:
            return hf_response
        # Last resort: simple conversation
        return get_simple_conversational_response(user_message, conversation_history)

def translate_to_oromo(english_text):
    """
    Translate English text to Oromo using GPT
    """
    if not is_api_key_configured():
        return f"Oromo translation of: {english_text}"
    
    try:
        client = OpenAI(api_key=OPENAI_API_KEY)
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a translator. Translate the following text to Oromo language. Respond with ONLY the Oromo translation, nothing else."
                },
                {
                    "role": "user",
                    "content": english_text
                }
            ],
            temperature=0.5,
            max_tokens=200
        )
        
        return response.choices[0].message.content.strip()
        
    except Exception as e:
        print(f"Translation error: {str(e)}")
        return english_text
