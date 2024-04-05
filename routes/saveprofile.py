from flask import jsonify, request
from utils.auth import require_auth
import json

def init_app(app_instance):
    @app_instance.app.route('/saveprofile', methods=['POST'])
    @require_auth
    def save_profile():
        data = json.loads(request.data)
        player_id = data.get('PlayerId')
        profile_data = data.get('ProfileData')

        if not player_id or not profile_data:
            return jsonify({"code": 400, "error": "PlayerId and ProfileData are required"}), 200

        collection = app_instance.db['players']

        # Update the profile and unlock it, or insert a new one if it doesn't exist
        result = collection.update_one(
            {"PlayerId": player_id},
            {"$set": {"ProfileData": profile_data, "locked": False, "lock_timestamp": None}},
            upsert=True
        )

        if result.upserted_id or result.modified_count > 0:
            return jsonify({"code": 200, "message": "Profile saved successfully"}), 200
        else:
            return jsonify({"code": 500, "error": "Failed to save profile"}), 200