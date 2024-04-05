# routes/mongoping.py
from flask import jsonify

def init_app(app_instance):
    @app_instance.app.route('/mongoping', methods=['POST'])
    def mongoping():
        try:
            app_instance.db.command('ping')
            return jsonify({"message": "Successfully connected to MongoDB!"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500