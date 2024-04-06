# Flask API Documentation

## Overview

This is the documentation for Heroku. This documentation details the functionalities of a Flask API designed for managing user authentication, file and directory operations, specifically focusing on image storage and metadata handling within a predefined file system structure. The API provides secured endpoints for file uploads, directory information retrieval, and user management.

## Endpoints

Base URL: `https://item-in-sight-staging-027791941423.herokuapp.com`

### Authentication

- **Endpoint**: `/setuser`
- **Method**: `POST`
- **Description**: Registers or updates a user's credentials in the system.
- **Headers**: None
- **Body** (JSON):
  - `username`: The user's username.
  - `password`: The user's password.
- **Responses**:
  - `200`: User was successfully registered or updated.
  - `400`: Missing or invalid username/password.
  - `500`: Internal server error.

### Image Handling

#### Upload Image

- **Endpoint**: `/setimage/<path:image_dir>`
- **Method**: `POST`
- **Description**: Uploads an image file to a specified directory, with user authentication required.
- **URL Parameters**:
  - `image_dir`: The directory path within the server's file system where the image will be stored.
- **Headers**:
  - `Authorization`: The user's API key.
- **Body**:
  - `image`: The PNG image file to be uploaded, sent as form-data.
- **Responses**:
  - `201`: Image successfully uploaded.
  - `400`: Invalid request, such as no image file in the request or non-PNG file.
  - `401`: Unauthorized access, incorrect username or password.
  - `500`: Internal server error.

### Directory Operations

#### Get Directory Location

- **Endpoint**: `/getlocation/<path:dir_path>`
- **Method**: `GET`
- **Description**: Retrieves location information for a given directory, with user authentication required.
- **URL Parameters**:
  - `dir_path`: The directory path within the server's file system for which location information is requested.
- **Headers**:
  - `Authorization`: The user's API key.
- **Responses**:
  - `200`: Successfully retrieved location information.
  - `401`: Unauthorized access, incorrect username or password.
  - `Error Status Code from Backend`: Failed to retrieve location, forwards the backend's error.

#### Set Directory Location

- **Endpoint**: `/setlocation/<path:dir_path>`
- **Method**: `POST`
- **Description**: Sets or updates the location information for a given directory, with user authentication required.
- **URL Parameters**:
  - `dir_path`: The directory path within the server's file system where the location information will be set.
- **Headers**:
  - `Authorization`: The user's API key.
- **Body** (JSON):
  - `description`: The location description or metadata.
- **Responses**:
  - `201`: Location information successfully set.
  - `401`: Unauthorized access, incorrect username or password.
  - `Error Status Code from Backend`: Failed to set location, forwards the backend's error.

### Notes

- All endpoints require proper user authentication for secure access.
- Users must have valid credentials to interact with the file system through the provided endpoints.
- The base URL provided above should be used as the starting point for all API requests.
- Responses may include additional metadata or error details not fully documented here, depending on the operation's context and outcome.
