# routes/getlocation.py
from flask import jsonify, request, Response
import requests
from bson import ObjectId

def init_app(app_instance):
    @app_instance.app.route('/getlocation/<path:location_path>', methods=['GET'])
    def getlocation(location_path):
        try:
            username = request.headers.get('username')
            password = request.headers.get('password')

            user = app_instance.get_authed_user(app_instance, username, password)
            if not user:
                return jsonify({"error": "Unauthorized: Incorrect username or password"}), 401

            # Split the path into individual location names
            location_names = location_path.split('/')

            # Retrieve the user's locations
            user_locations = user.get('locations', [])
            location = find_location_by_path(user_locations, location_names, app_instance.db)

            if location:
                return jsonify(location)
            else:
                return jsonify({"error": "Location not found"}), 404

        except Exception as e:
            return jsonify({"error": str(e)}), 500

def find_location_by_path(location_ids, location_names, db):
    current_level_locations = [db.locations.find_one({"_id": ObjectId(location_id)}) for location_id in location_ids]

    for name in location_names:
        next_location = next((loc for loc in current_level_locations if loc and loc.get('name') == name), None)
        if not next_location:
            return None
        current_level_locations = [db.locations.find_one({"_id": ObjectId(subloc_id)}) for subloc_id in next_location.get('sublocations', [])]

    return next_location