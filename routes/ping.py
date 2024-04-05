# routes/ping.py
from flask import jsonify
from utils.auth import require_auth

def init_app(app_instance):
    @app_instance.app.route('/', methods=['POST'])
    @app_instance.app.route('/home', methods=['POST'])
    @app_instance.app.route('/ping', methods=['POST'])
    @require_auth
    def home():
        return jsonify({"message": f"You are connected to ItemInSight Heroku in {app_instance.flask_env} mode!"})