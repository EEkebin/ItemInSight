# routes/getimage.py
from flask import jsonify
from utils.auth import require_auth

def init_app(app_instance):
    @app_instance.app.route('/getimage', methods=['GET'])
    @require_auth
    def getimage():
        try:
            return jsonify({"message": "Success!"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500