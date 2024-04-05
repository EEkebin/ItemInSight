# routes/releaseserver.py
from flask import jsonify, request
from utils.auth import require_auth
from datetime import datetime
import json

def init_app(app_instance):
    @app_instance.app.route('/releaseserver', methods=['POST'])
    @require_auth
    def release_server():
        # Extract the JobId from the request
        data = json.loads(request.data)
        job_id = data.get('JobId')
        if not job_id:
            return jsonify({"error": "JobId is required"}), 400

        # Get the collection
        servers_collection = app_instance.db['servers']
        serverhistory_collection = app_instance.db['serverhistory']

        # Find the document in servers collection
        server_doc = servers_collection.find_one_and_delete({"JobId": job_id})
        if not server_doc:
            return jsonify({"error": "Server not found"}), 404

        # Add the server closed time to the document
        server_doc['closed_at'] = datetime.utcnow()

        # Insert the document into serverhistory collection
        result = serverhistory_collection.insert_one(server_doc)

        return jsonify({"message": "Server released successfully", "InsertedId": str(result.inserted_id)}), 200