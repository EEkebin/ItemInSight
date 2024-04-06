def get_authed_user(app_instance, username, password):
    # Check if they have the correct username and password
    db = app_instance.db
    user = db.users.find_one({"username": username, "password": password})
    
    if user:
        return user