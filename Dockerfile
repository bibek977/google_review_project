# Use an official Python runtime as a parent image
FROM python:3.9

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV LANG C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

# Set working directory
WORKDIR /google_review_project

# Copy the current directory contents into the container at /google_review_project
COPY . /google_review_project

# Install system dependencies
RUN apt-get update \
    && apt-get install -y nodejs npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
WORKDIR /google_review_project
RUN pip install --no-cache-dir -r requirements.txt

# Change directory to frontend and install Node.js dependencies
WORKDIR /google_review_project/frontend
RUN npm install

# Change directory back to the project root
WORKDIR /google_review_project

# Expose port 8000 to allow communication to/from server
EXPOSE 8000

# Copy the entrypoint script into the container
COPY entrypoint.sh /entrypoint.sh

# Grant execute permissions to the entrypoint script
RUN chmod +x /entrypoint.sh

# Set the entrypoint command
ENTRYPOINT ["/entrypoint.sh"]
