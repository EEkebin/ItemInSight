# routes/getimage.py
from flask import jsonify, request, Response, abort
from utils.auth import require_auth
import requests
import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

def init_app(app_instance):
    @app_instance.route('/getimage/<path:image_name>', methods=['GET'])
    @require_auth
    def getimage(image_name):
        try:
            # Check if the file extension is .png
            if not image_name.lower().endswith('.png'):
                return jsonify({"error": "Only PNG images are allowed."}), 400
            
            # Base URL of the first backend
            idb_base_url = app_instance.idb_base_url
            # Endpoint for the specific image
            image_endpoint = f"{idb_base_url}/get/{image_name}"
            # Authorization key
            auth_key = app_instance.idb_auth  # This should ideally be stored/configured securely
            
            # Make a request to the first backend to get the image
            response = requests.get(image_endpoint, headers={"Authorization": auth_key})

            logging.info(f'Image endpoint: {image_endpoint}')
            
            # If the request was successful, forward the image data
            if response.status_code == 200:
                # Additionally, confirm the content type is 'image/png'
                if response.headers['Content-Type'] == 'image/png':
                    return Response(response.content, mimetype='image/png')
                else:
                    return jsonify({"error": "The requested file is not a PNG image."}), 400
            else:
                # Forward the error from the first backend
                return jsonify({"error": "Failed to retrieve image"}), response.status_code

        except Exception as e:
            return jsonify({"error": str(e)}), 500
