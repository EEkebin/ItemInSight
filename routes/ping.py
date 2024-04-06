# routes/ping.py
from flask import jsonify
from flask_cors import cross_origin

def init_app(app_instance):
    @app_instance.app.route('/')
    @app_instance.app.route('/home')
    @app_instance.app.route('/ping')
    @cross_origin()
    def home():
        return jsonify({"message": f"You are connected to ItemInSight Heroku in {app_instance.flask_env} mode!"})