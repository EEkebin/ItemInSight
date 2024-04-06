# routes/setimage.py
from flask import jsonify
from utils.auth import require_auth

def init_app(app_instance):
    @app_instance.app.route('/setimage', methods=['POST'])
    @require_auth
    def setimage():
        try:
            return jsonify({"message": "Success!"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500