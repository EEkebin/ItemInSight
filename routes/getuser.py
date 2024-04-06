from flask import request, jsonify
from flask_cors import cross_origin

def init_app(app_instance):
    @app_instance.app.route('/getuser', methods=['POST'])
    @cross_origin()
    def getuser():
        try:
            username = request.json.get('username')
            password = request.json.get('password')

            if not username or not password:
                return jsonify({"error": "Username and password are required"}), 400

            user = app_instance.get_authed_user(app_instance, username, password)
            if not user:
                return jsonify({"error": "Unauthorized: Incorrect username or password"}), 401
            else:
                return jsonify({"message": "User authenticated successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500