# routes/getserver.py
from flask import jsonify, request
from utils.auth import require_auth
import json

def init_app(app_instance):
    @app_instance.app.route('/getserver', methods=['POST'])
    @require_auth
    def get_server():
        # Extract the JobId from the request
        data = json.loads(request.data)
        job_id = data.get('JobId')
        if not job_id:
            return jsonify({"error": "JobId is required"}), 400

        # Get the collection
        collection = app_instance.db['servers']

        # Find the document in servers collection
        server_doc = collection.find_one({"JobId": job_id})
        if not server_doc:
            return jsonify({"error": "Server not found"}), 404

        # Convert ObjectId to string
        server_doc['_id'] = str(server_doc['_id'])

        # Return the server document as JSON
        return jsonify(server_doc)