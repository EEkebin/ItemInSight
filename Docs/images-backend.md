# Flask API Documentation

## Overview

This documentation outlines the endpoints of a Flask API designed for managing files and directories, with a focus on image storage and directory information handling within a specified file system.

## Endpoints

Base URL: `http://example.com`

### Save File

- **Endpoint**: `/savefile/<path:folderpath>`
- **Method**: `POST`
- **Description**: Saves an uploaded image file to a specified directory within the server's file system.
- **URL Parameters**:
  - `folderpath`: The directory path within the server's file system where the image will be stored.
- **Headers**:
  - `Authorization`: Required. The API key to authorize the request.
- **Body**:
  - `file`: The image file to be uploaded, sent as form-data.
- **Responses**:
  - `201`: File successfully saved. Returns the path where the file is saved.
  - `400`: Invalid request, e.g., no file part in the request or invalid folder path.
  - `401`: Unauthorized access, e.g., incorrect or missing Authorization header.

### Create Directory

- **Endpoint**: `/mkdir/<path:folderpath>`
- **Method**: `POST`
- **Description**: Creates a new directory at the specified path and optionally updates or creates an `info.json` file in the final directory with a description.
- **URL Parameters**:
  - `folderpath`: The path within the server's file system where the directory will be created.
- **Headers**:
  - `Authorization`: Required. The API key to authorize the request.
- **Body** (JSON):
  - `description`: Optional. A description to be saved in `info.json` within the created directory.
- **Responses**:
  - `201`: Directory successfully created. Returns the path of the created directory.
  - `400`: Invalid request, e.g., invalid folder path.
  - `401`: Unauthorized access, e.g., incorrect or missing Authorization header.

### Get Directory Information

- **Endpoint**: `/getdir/<path:folderpath>`
- **Method**: `GET`
- **Description**: Retrieves information about a specified directory, including its `info.json` content and any child directories or image files.
- **URL Parameters**:
  - `folderpath`: The directory path within the server's file system for which information is requested.
- **Headers**:
  - `Authorization`: Required. The API key to authorize the request.
- **Responses**:
  - `200`: Successfully retrieved directory information. Returns a JSON object with directory info, image URL if available, and child directories.
  - `400`: Invalid request, e.g., invalid folder path.
  - `401`: Unauthorized access, e.g., incorrect or missing Authorization header.
  - `404`: Directory not found.

### Get Directory Image

- **Endpoint**: `/getdir/<path:folderpath>/image.png`
- **Method**: `GET`
- **Description**: Serves the `image.png` file from the specified directory.
- **URL Parameters**:
  - `folderpath`: The directory path within the server's file system from which the image will be served.
- **Headers**:
  - `Authorization`: Required. The API key to authorize the request.
- **Responses**:
  - `200`: Successfully served the image file.
  - `401`: Unauthorized access, e.g., incorrect or missing Authorization header.
  - `404`: Image not found.
