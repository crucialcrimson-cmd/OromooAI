from dotenv import load_dotenv
import os
from pathlib import Path

env_path = Path('.') / '.env'
print(f"Looking for .env at: {env_path.absolute()}")
print(f"File exists: {env_path.exists()}")

# Read file directly
with open(env_path, 'r') as f:
    content = f.read()
    print(f"\nFile content (first 200 chars):\n{content[:200]}")

load_dotenv(env_path)
key = os.getenv('OPENAI_API_KEY')
print(f"\nAPI Key loaded: {bool(key)}")
if key:
    print(f"First 50 chars: {key[:50]}")
else:
    print("Key is None - not being loaded!")
