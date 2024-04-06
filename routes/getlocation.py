from flask import request, jsonify
import requests

def init_app(app_instance):
    @app_instance.app.route('/getlocation/<path:dir_path>', methods=['GET'])
    def getlocation(dir_path):
        username = request.headers.get('username')
        password = request.headers.get('password')

        user = app_instance.get_authed_user(app_instance, username, password)
        if not user:
            return jsonify({"error": "Unauthorized: Incorrect username or password"}), 401

        dirname = dir_path

        # Base URL of the first backend
        idb_base_url = app_instance.idb_base_url
        # Endpoint for getting the location
        get_endpoint = f"{idb_base_url}/getdir/{username}/{dirname}"
        # Authorization key
        auth_key = app_instance.idb_auth  # This should ideally be stored/configured securely

        # Prepare the request to the first backend
        headers = {
            "Authorization": auth_key
        }

        # Make the request to the first backend
        response = requests.get(get_endpoint, headers=headers)

        # Handle the response from the first backend
        if response.status_code == 200:
            location_data = response.json()
            return jsonify(location_data), 200
        else:
            # Forward the error from the first backend
            return jsonify({"error": "Failed to retrieve location"}), response.status_code