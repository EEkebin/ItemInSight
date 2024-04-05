from flask import jsonify, request
from utils.auth import require_auth
import json
from pymongo import ReturnDocument
import datetime

def init_app(app_instance):
    @app_instance.app.route('/loadprofile', methods=['POST'])
    @require_auth
    def load_profile():
        data = json.loads(request.data)
        player_id = data.get('PlayerId')
        if not player_id:
            return jsonify({"code": 400, "error": "PlayerId is required"}), 200

        collection = app_instance.db['players']
        now = datetime.datetime.utcnow()

        # First check if the profile exists
        profile_exists = collection.find_one({"PlayerId": player_id})
        if not profile_exists:
            return jsonify({"code": 404, "error": "Profile not found"}), 200

        # Attempt to lock the profile, also check for lock timeout
        profile_doc = collection.find_one_and_update(
            {
                "PlayerId": player_id,
                "$or": [
                    {"locked": False},
                    {"lock_timestamp": {"$lt": now - datetime.timedelta(minutes=5)}}
                ]
            },
            {
                "$set": {"locked": True, "lock_timestamp": now}
            },
            return_document=ReturnDocument.AFTER
        )

        if not profile_doc:
            return jsonify({"code": 423, "error": "Profile is locked"}), 200

        # Convert ObjectId to string for response
        profile_doc['_id'] = str(profile_doc['_id'])

        return jsonify({"code": 200, "profile": profile_doc}), 200