from flask import jsonify, request
from utils.auth import require_auth

def init_app(app_instance):
    @app_instance.app.route('/pushcommands', methods=['POST'])
    @require_auth
    def push_commands():
        # Extract the JobId and commands from the request
        data = request.json
        job_id = data.get('JobId')
        commands = data.get('commands')
        if not job_id or not commands:
            return jsonify({"error": "JobId and commands are required"}), 400

        # Get the collection
        collection = app_instance.db['servers']

        # Check if we need to update all servers
        if job_id == "ALL":
            # Get all servers
            servers = collection.find()
            for server in servers:
                current_commands = server.get('commands', [])
                # Append the new commands with a number
                for i, command in enumerate(commands, start=len(current_commands) + 1):
                    current_commands.append({"ci": i, "command": command})
                # Update the server document with the commands
                collection.update_one(
                    {"_id": server["_id"]},
                    {"$set": {"commands": current_commands}}
                )
            return jsonify({"message": "Commands pushed to all servers successfully"}), 200
        else:
            # Get the current commands for the server
            server = collection.find_one({"JobId": job_id})
            if not server:
                return jsonify({"error": "Server not found"}), 404
            current_commands = server.get('commands', [])

            # Append the new commands with a number
            for i, command in enumerate(commands, start=len(current_commands) + 1):
                current_commands.append({"ci": i, "command": command})

            # Update the server document with the commands
            result = collection.update_one(
                {"JobId": job_id},
                {"$set": {"commands": current_commands}}
            )

            return jsonify({"message": "Commands pushed successfully"}), 200