# Updates or creates a user if they do not already exist
# routes/setuser.py
from flask import jsonify

def init_app(app_instance):
    @app_instance.app.route('/setuser')
    def setuser():
        try:
            app_instance.db.command('TODO???')
            return jsonify({"message": "Successfully connected to MongoDB!"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500