# routes/setupserver.py
from flask import jsonify, request
from utils.auth import require_auth
from datetime import datetime
import json

def init_app(app_instance):
    @app_instance.app.route('/setupserver', methods=['POST'])
    @require_auth
    def setup_server():
        # Extract the JobId and GameVersion from the request
        data = json.loads(request.data)
        job_id = data['JobId']
        game_version = data.get('GameVersion')
        if not job_id:
            return jsonify({"error": "JobId is required"}), 400

        # Get the collection
        collection = app_instance.db['servers']

        # Insert the document into MongoDB with GameVersion
        current_time = datetime.utcnow()
        result = collection.insert_one({"JobId": job_id, "GameVersion": game_version, "created_at": current_time})

        return jsonify({"message": "Server setup successful", "InsertedId": str(result.inserted_id)}), 200