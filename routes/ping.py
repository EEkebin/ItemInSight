# routes/ping.py
from flask import jsonify
from utils.auth import require_auth

def init_app(app_instance):
    @app_instance.app.route('/')
    @app_instance.app.route('/home')
    @app_instance.app.route('/ping')
    @require_auth
    def home():
        return jsonify({"message": f"You are connected to ItemInSight Heroku in {app_instance.flask_env} mode!"})