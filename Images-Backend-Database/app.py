from flask import Flask, send_file, abort, request, jsonify
import json
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

# Expected authorization key
AUTH_KEY = os.getenv("AUTH_KEY")

if AUTH_KEY is None:
    raise ValueError("Missing AUTH_KEY in environment variables.")

app = Flask(__name__)
CORS(app)

# Define the directory to serve files from
FILES_DIRECTORY = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), 'files')


@app.route("/savefile/<path:folderpath>", methods=['POST'])
def save_file(folderpath):
    # Retrieve the Authorization header from the request
    auth_header = request.headers.get('Authorization')

    # Check if the Authorization header matches the expected key
    if auth_header != AUTH_KEY:
        # If the key does not match, abort with 401 Unauthorized
        abort(401)

    # Construct the full directory path within the FILES_DIRECTORY
    target_dir = os.path.join(FILES_DIRECTORY, folderpath)

    # Check if the path is secure (prevents directory traversal)
    if os.path.commonprefix([FILES_DIRECTORY, target_dir]) != FILES_DIRECTORY:
        abort(400, description="Invalid folder path.")

    # Ensure the directory exists
    os.makedirs(target_dir, exist_ok=True)

    # Define the target file path as 'image.png' within the target directory
    target_file_path = os.path.join(target_dir, 'image.png')

    # Assuming the file is sent as part of a form (use 'file' as the key)
    if 'file' not in request.files:
        abort(400, description="No file part in the request.")

    file = request.files['file']

    # Save the file as 'image.png' within the specified directory
    file.save(target_file_path)

    return f"File saved to {folderpath}/image.png", 201


@app.route("/mkdir/<path:folderpath>", methods=['POST'])
def create_directory(folderpath):
    # Retrieve the Authorization header from the request
    auth_header = request.headers.get('Authorization')
    descriptionjson = request.json.get("description", "")

    # Check if the Authorization header matches the expected key
    if auth_header != AUTH_KEY:
        # If the key does not match, abort with 401 Unauthorized
        abort(401)

    # Construct the full path within the FILES_DIRECTORY
    target_path = os.path.join(FILES_DIRECTORY, folderpath)

    # Check if the path is secure (prevents directory traversal)
    if os.path.commonprefix([FILES_DIRECTORY, target_path]) != FILES_DIRECTORY:
        abort(400, description="Invalid folder path.")

    # Split the folder path to check if the current folder is the last one
    folders = folderpath.split('/')

    # Iterate through the parts of the path
    for i in range(len(folders)):
        # Construct the current path
        current_path = os.path.join(FILES_DIRECTORY, *folders[:i+1])

        # Determine the description for info.json
        info_description = {"description": ""}
        if i == len(folders) - 1:  # If it's the last folder
            info_description = {
                "description": descriptionjson if descriptionjson else ""}

            # If the last folder already exists, only update the info.json
            if os.path.exists(current_path):
                with open(os.path.join(current_path, 'info.json'), 'w') as info_file:
                    json.dump(info_description, info_file)
                break  # No need to continue the loop

        # Create the folder if it doesn't exist and write the info.json file
        if not os.path.exists(current_path):
            os.makedirs(current_path, exist_ok=True)
            with open(os.path.join(current_path, 'info.json'), 'w') as info_file:
                json.dump(info_description, info_file)

    return f"Folder created at {folderpath}", 201


@app.route("/getdir/<path:folderpath>")
def get_directory(folderpath):
    auth_header = request.headers.get('Authorization')

    # Check if the Authorization header matches the expected key
    if auth_header != AUTH_KEY:
        # If the key does not match, abort with 401 Unauthorized
        abort(401)

    # Construct the full path within the FILES_DIRECTORY
    target_path = os.path.join(FILES_DIRECTORY, folderpath)

    # Check if the path is secure (prevents directory traversal)
    if os.path.commonprefix([FILES_DIRECTORY, target_path]) != FILES_DIRECTORY:
        abort(400, description="Invalid folder path.")

    if os.path.exists(target_path):
        response_data = {}

        # Check and read the info.json file for the current directory
        info_path = os.path.join(target_path, 'info.json')
        if os.path.exists(info_path):
            with open(info_path, 'r') as info_file:
                response_data['info'] = json.load(info_file)

        # Check for image.png in the current directory
        image_path = os.path.join(target_path, 'image.png')
        if os.path.exists(image_path):
            response_data['image_url'] = request.host_url.rstrip(
                '/') + '/getdir/' + folderpath + '/image.png'

        # List all immediate child directories and their info.json and image.png
        children = []
        for child in os.listdir(target_path):
            child_path = os.path.join(target_path, child)
            if os.path.isdir(child_path):
                child_data = {'name': child}

                # Check and include info.json for the child directory
                child_info_path = os.path.join(child_path, 'info.json')
                if os.path.exists(child_info_path):
                    with open(child_info_path, 'r') as child_info_file:
                        child_data['info'] = json.load(child_info_file)

                # Check and include image.png for the child directory
                child_image_path = os.path.join(child_path, 'image.png')
                if os.path.exists(child_image_path):
                    child_data['image_url'] = request.host_url.rstrip(
                        '/') + '/getdir/' + folderpath + '/' + child + '/image.png'

                children.append(child_data)

        # Include the children data in the response
        if children:
            response_data['children'] = children

        # Return the collected data
        return jsonify(response_data), 200

    else:
        abort(404, description="Directory not found.")


@app.route("/getdir/<path:folderpath>/image.png")
def get_directory_image(folderpath):
    # This is a simple route to return the image.png file if requested
    target_path = os.path.join(FILES_DIRECTORY, folderpath, 'image.png')

    if os.path.exists(target_path):
        return send_file(target_path, mimetype='image/png')
    else:
        abort(404, description="Image not found.")


if __name__ == "__main__":
    app.run(debug=True, port=42069)
