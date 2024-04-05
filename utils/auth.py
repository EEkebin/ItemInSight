from functools import wraps
from flask import jsonify, request
import os

auth_token = os.environ.get('AUTH_TOKEN', 'default_auth_token')

def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if token != auth_token:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated_function