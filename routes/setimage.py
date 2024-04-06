# routes/setimage.py
from flask import request, jsonify
import requests
import os

def init_app(app_instance):
    @app_instance.app.route('/setimage/<path:image_dir>', methods=['POST'])
    def setimage(image_dir):
        try:

            username = request.headers.get('username')
            password = request.headers.get('password')

            user = app_instance.get_authed_user(app_instance, username, password)
            if not user:
                return jsonify({"error": "Unauthorized: Incorrect username or password"}), 401
            
            # Check if there is a file in the request
            if 'image' not in request.files:
                return jsonify({"error": "No file part in the request."}), 400
            
            file = request.files['image']

            # Check if the file has a filename
            if file.filename == '':
                return jsonify({"error": "No selected file."}), 400
            
            # Ensure the file is a PNG image
            if not file or not file.filename.lower().endswith('.png'):
                return jsonify({"error": "Only PNG images are allowed."}), 400

            # Base URL of the first backend
            idb_base_url = app_instance.idb_base_url
            # Endpoint for saving the image
            save_endpoint = f"{idb_base_url}/save/{username + "/" + image_dir}"
            # Authorization key
            auth_key = app_instance.idb_auth  # This should ideally be stored/configured securely
            
            # Prepare the file in a form that can be sent via POST request
            files = {'file': ("image.png", file.stream, 'image/png')}
            
            # Make a request to the first backend to save the image
            response = requests.post(save_endpoint, headers={"Authorization": auth_key}, files=files)
            
            # Handle the response from the first backend
            if response.status_code == 201:
                return jsonify({"message": f"Image image.png uploaded successfully."}), 201
            else:
                # Forward the error from the first backend
                return jsonify({"error": "Failed to upload image"}), response.status_code

        except Exception as e:
            return jsonify({"error": str(e)}), 500
