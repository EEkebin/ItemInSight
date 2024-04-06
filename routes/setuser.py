from flask import request, jsonify

def init_app(app_instance):
    @app_instance.app.route('/setuser', methods=['POST'])
    def setuser():
        try:
            username = request.json.get('username')
            password = request.json.get('password')

            if not username or not password:
                return jsonify({"error": "Username and password are required"}), 400

            # Update or create the user document
            app_instance.db.users.update_one(
                {'username': username},
                {'$set': {'password': password}},
                upsert=True
            )

            return jsonify({"message": "User set successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500