# app.py
from flask import Flask
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
from dotenv import load_dotenv
import os

from utils.error_handlers import init_error_handlers

from routes.mongoping import init_app as init_mongoping_route
from routes.ping import init_app as init_ping_route

# TODO: implement the following routes

from routes.getimage import init_app as init_getimage_route
# from routes.setimage import init_app as init_setimage_route

# from routes.getuser import init_app as init_getuser_route
# from routes.setuser import init_app as init_setuser_route

# from routes.getlocation import init_app as init_getlocation_route
# from routes.setlocation import init_app as init_setlocation_route

# END TODO


class App:
    # We will inject an App reference into the routes so we can reuse things easily
    def __init__(self):
        load_dotenv()
        self.app = Flask(__name__)
        self.app.secret_key = os.environ.get('SECRET_KEY', 'default_secret_key')
        self.auth_token = os.environ.get('AUTH_TOKEN', 'default_auth_token')

        # Get the Flask environment
        self.flask_env = os.environ.get('FLASK_ENV')

        # Get MongoDB URI components from environment variables
        self.mongo_uri_template = os.environ.get('MONGO_URI_TEMPLATE', "default_mongo_uri_template")
        self.mongo_username = quote_plus(os.environ.get('MONGO_USERNAME', 'default_username'))
        self.mongo_password = quote_plus(os.environ.get('MONGO_PASSWORD', 'default_password'))

        # Get the database name depending on the environment
        self.db_name = os.environ.get('DB_NAME', "default_mongo_uri_template")

        # Construct the encoded URI
        self.mongo_uri = self.mongo_uri_template.format(username=self.mongo_username, password=self.mongo_password)

        # Initialize the MongoClient
        self.client = MongoClient(self.mongo_uri, server_api=ServerApi('1'))
        self.db = self.client[self.db_name]

        # Get the Image Database variables
        self.idb_port = os.environ.get('IDB_PORT', 'default_idb_port')
        self.idb_base_url = os.environ.get('IDB_BASE_URL', 'default_idb_base_url')
        self.idb_auth = os.environ.get('IDB_AUTH', 'default_idb_auth')


# Expose app at the module level
my_app = App()
app = my_app.app

# Initialize the error handlers
init_error_handlers(my_app)

# Register the routes with dependency injection
init_mongoping_route(my_app)
init_ping_route(my_app)
init_getimage_route(my_app)

if __name__ == "__main__":
    # If testing locally, ensure that .env is created and necessary variables are set, including FLASK_ENV
    if my_app.flask_env == 'development':
        app.debug = True
        app.run()
    else:
        # In production, the app will be run by Gunicorn, so no need to call app.run()
        pass