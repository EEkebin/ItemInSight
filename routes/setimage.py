# routes/setimage.py
from flask import request, jsonify
from werkzeug.utils import secure_filename
from utils.auth import require_auth
import requests
import os

def init_app(app_instance):
    @app_instance.app.route('/setimage', methods=['POST'])
    @require_auth
    def setimage():
        try:
            # Check if there is a file in the request
            if 'file' not in request.files:
                return jsonify({"error": "No file part in the request."}), 400
            
            file = request.files['file']

            # Check if the file has a filename
            if file.filename == '':
                return jsonify({"error": "No selected file."}), 400
            
            # Ensure the file is a PNG image
            if not file or not file.filename.lower().endswith('.png'):
                return jsonify({"error": "Only PNG images are allowed."}), 400
            
            # Secure the filename
            filename = secure_filename(file.filename)

            # Base URL of the first backend
            idb_base_url = app_instance.idb_base_url
            # Endpoint for saving the image
            save_endpoint = f"{idb_base_url}/save/{filename}"
            # Authorization key
            auth_key = app_instance.idb_auth  # This should ideally be stored/configured securely
            
            # Prepare the file in a form that can be sent via POST request
            files = {'file': (filename, file.stream, 'image/png')}
            
            # Make a request to the first backend to save the image
            response = requests.post(save_endpoint, headers={"Authorization": auth_key}, files=files)
            
            # Handle the response from the first backend
            if response.status_code == 201:
                return jsonify({"message": f"Image {filename} uploaded successfully."}), 201
            else:
                # Forward the error from the first backend
                return jsonify({"error": "Failed to upload image"}), response.status_code

        except Exception as e:
            return jsonify({"error": str(e)}), 500
