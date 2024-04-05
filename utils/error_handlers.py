# utils/error_handlers.py
from flask import jsonify

def init_error_handlers(app_instance):
    @app_instance.app.errorhandler(401)
    def unauthorized(error):
        return jsonify({"error": "Unauthorized"}), 401

    # Add more error handlers here