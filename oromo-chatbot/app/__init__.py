from flask import Flask

def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config['SECRET_KEY'] = 'oromo-chatbot-secret-key'
    
    from app.routes import main_bp
    app.register_blueprint(main_bp)
    
    return app
