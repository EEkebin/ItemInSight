from flask import request, jsonify
import requests

def init_app(app_instance):
    @app_instance.route('/setlocation/<path:dir_path>', methods=['POST'])
    def setlocation(dir_path):
        username = request.headers.get('username')
        password = request.headers.get('password')

        # Get the description from the JSON body
        description = request.json.get('description', None)

        user = app_instance.get_authed_user(username, password)
        if not user:
            return jsonify({"error": "Unauthorized: Incorrect username or password"}), 401

        dirname = dir_path

        # Base URL of the first backend
        idb_base_url = app_instance.idb_base_url
        # Endpoint for saving the location
        save_endpoint = f"{idb_base_url}/mkdir/{username}/{dirname}"
        # Authorization key
        auth_key = app_instance.idb_auth  # This should ideally be stored/configured securely

        # Prepare the request to the first backend
        headers={"Authorization": auth_key}
        data = {'description': description}

        # Make the request to the first backend
        response = requests.post(save_endpoint, headers=headers, json=data)

        # Handle the response from the first backend
        if response.status_code == 201:
            return jsonify({"message": f"Location {dirname} uploaded successfully."}), 201
        else:
            # Forward the error from the first backend
            return jsonify({"error": "Failed to upload location"}), response.status_code