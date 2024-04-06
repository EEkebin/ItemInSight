# routes/setimage.py
from flask import jsonify, request, Response
import requests

def init_app(app_instance):
    @app_instance.app.route('/setimage/<path:image_name>', methods=['GET'])
    def setimage(image_name):
        try:
            username = request.headers.get('username')
            password = request.headers.get('password')

            user = app_instance.get_authed_user(app_instance, username, password)
            if not user:
                return jsonify({"error": "Unauthorized: Incorrect username or password"}), 401

            # Base URL of the first backend
            idb_base_url = app_instance.idb_base_url
            # Endpoint for the specific image
            image_endpoint = f"{idb_base_url}/save/{username + "/" + image_name}"
            # Authorization key
            auth_key = app_instance.idb_auth  # This should ideally be stored/configured securely
            
            # Make a request to the first backend to get the image
            response = requests.get(image_endpoint, headers={"Authorization": auth_key})
            
            # If the request was successful, forward the image data
            if response.status_code == 200:
                return jsonify({"message": "Image saved successfully"}), 200
            else:
                # Forward the error from the first backend
                return jsonify({"error": "Failed to retrieve image"}), response.status_code

        except Exception as e:
            return jsonify({"error": str(e)}), 500
